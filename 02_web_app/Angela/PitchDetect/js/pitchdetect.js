/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

PitchDetect = (function(){

	window.AudioContext = window.AudioContext || window.webkitAudioContext;

	var audioContext = null;
	var isPlaying = false;
	var sourceNode = null;
	var analyser = null;
	var theBuffer = null;
	var DEBUGCANVAS = null;
	var mediaStreamSource = null;
	var detectorElem, 
		canvasElem,
		waveCanvas,
		pitchElem,
		noteElem,
		detuneElem,
		detuneAmount;
	var currentTime = 0;

	var init = function(inputPath) {
		audioContext = new AudioContext();
		MAX_SIZE = Math.max(4,Math.floor(audioContext.sampleRate/5000));	// corresponds to a 5kHz signal

		//*** playback only ***
		var request = new XMLHttpRequest();
		
		request.open("GET", inputPath, true);
		request.responseType = "arraybuffer";
		request.onload = function() {
		  audioContext.decodeAudioData(request.response, function(buffer) { 
		    	theBuffer = buffer;
			}, function(error) {
            	console.error("decodeAudioData error", error);
        	});
		}
		request.send();
		//*** end playback only ***

		detectorElem = document.getElementById( "detector" );
		canvasElem = document.getElementById( "output" );
		DEBUGCANVAS = document.getElementById( "waveform" );
		if (DEBUGCANVAS) {
			waveCanvas = DEBUGCANVAS.getContext("2d");
			waveCanvas.strokeStyle = "black";
			waveCanvas.lineWidth = 1;
			drawWaveCanvasBg();
		}
		pitchElem = document.getElementById( "pitch" );
		noteElem = document.getElementById( "note" );
		detuneElem = document.getElementById( "detune" );
		detuneAmount = document.getElementById( "detune_amt" );

		detectorElem.ondragenter = function () { 
			this.classList.add("droptarget"); 
			return false; };
		detectorElem.ondragleave = function () { this.classList.remove("droptarget"); return false; };
		detectorElem.ondrop = function (e) {
	  		this.classList.remove("droptarget");
	  		e.preventDefault();
			theBuffer = null;

		  	var reader = new FileReader();
		  	reader.onload = function (event) {
		  		audioContext.decodeAudioData( event.target.result, function(buffer) {
		    		theBuffer = buffer;
		  		}, function(){alert("error loading!");} ); 

		  	};
		  	reader.onerror = function (event) {
		  		alert("Error: " + reader.error );
			};
		  	reader.readAsArrayBuffer(e.dataTransfer.files[0]);
		  	return false;
		};
	};

	var error = function() {
	    alert('Stream generation failed.');
	};

	var getUserMedia = function(dictionary, callback) {
	    try {
	        navigator.getUserMedia = 
	        	navigator.getUserMedia ||
	        	navigator.webkitGetUserMedia ||
	        	navigator.mozGetUserMedia;
	        navigator.getUserMedia(dictionary, callback, error);
	    } catch (e) {
	        alert('getUserMedia threw exception :' + e);
	    }
	};

	var gotStream = function(stream) {
	    // Create an AudioNode from the stream.
	    mediaStreamSource = audioContext.createMediaStreamSource(stream);

	    // Connect it to the destination.
	    analyser = audioContext.createAnalyser();
	    analyser.fftSize = 2048;
	    mediaStreamSource.connect(analyser);
	    updatePitch();
	};

	var toggleOscillator = function() {
	    if (isPlaying) {
	        //stop playing and return
	        sourceNode.stop(0);
	        sourceNode = null;
	        analyser = null;
	        isPlaying = false;
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
	        window.cancelAnimationFrame( rafID );
	        return "play oscillator";
	    }
	    sourceNode = audioContext.createOscillator();

	    analyser = audioContext.createAnalyser();
	    analyser.fftSize = 2048;
	    sourceNode.connect( analyser );
	    analyser.connect( audioContext.destination );
	    sourceNode.start(0);
	    isPlaying = true;
	    isLiveInput = false;
	    updatePitch();

	    return "stop";
	};

	var toggleLiveInput = function() {
	    if (isPlaying) {
	        //stop playing and return
	        sourceNode.stop( 0 );
	        sourceNode = null;
	        analyser = null;
	        isPlaying = false;
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
	        window.cancelAnimationFrame( rafID );
	    }
	    getUserMedia(
	    	{
	            "audio": {
	                "mandatory": {
	                    "googEchoCancellation": "false",
	                    "googAutoGainControl": "false",
	                    "googNoiseSuppression": "false",
	                    "googHighpassFilter": "false"
	                },
	                "optional": []
	            },
	        }, gotStream);
	};

	var togglePlayback = function() {
	    if (isPlaying) {
	        //stop playing and return
	        sourceNode.stop( 0 );
	        sourceNode = null;
	        analyser = null;
	        isPlaying = false;
			if (!window.cancelAnimationFrame)
				window.cancelAnimationFrame = window.webkitCancelAnimationFrame;
	        window.cancelAnimationFrame( rafID );
	        return "start";
	    }

	    sourceNode = audioContext.createBufferSource();
	    sourceNode.buffer = theBuffer;
	    sourceNode.loop = false;

	    analyser = audioContext.createAnalyser();
	    analyser.fftSize = 2048;
	    sourceNode.connect(analyser);
	    analyser.connect(audioContext.destination);
	    sourceNode.start(0);
	    isPlaying = true;
	    isLiveInput = false;
	    updatePitch();

	    return "stop";
	};

	var rafID = null;
	var tracks = null;
	var buflen = 1024;
	var buf = new Float32Array(buflen);

	var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

	var noteFromPitch = function(frequency) {
		var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
		return Math.round(noteNum) + 69;
	};

	var frequencyFromNoteNumber = function(note) {
		return 440 * Math.pow(2,(note-69)/12);
	};

	var centsOffFromPitch = function(frequency, note) {
		return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
	};

	// this is a float version of the algorithm below - but it's not currently used.
	/*
	function autoCorrelateFloat( buf, sampleRate ) {
		var MIN_SAMPLES = 4;	// corresponds to an 11kHz signal
		var MAX_SAMPLES = maxPitch; // corresponds to a 44Hz signal
		var SIZE = maxPitch;
		var best_offset = -1;
		var best_correlation = 0;
		var rms = 0;

		if (buf.length < (SIZE + MAX_SAMPLES - MIN_SAMPLES))
			return -1;  // Not enough data

		for (var i=0;i<SIZE;i++)
			rms += buf[i]*buf[i];
		rms = Math.sqrt(rms/SIZE);

		for (var offset = MIN_SAMPLES; offset <= MAX_SAMPLES; offset++) {
			var correlation = 0;

			for (var i=0; i<SIZE; i++) {
				correlation += Math.abs(buf[i]-buf[i+offset]);
			}
			correlation = 1 - (correlation/SIZE);
			if (correlation > best_correlation) {
				best_correlation = correlation;
				best_offset = offset;
			}
		}
		if ((rms>0.1)&&(best_correlation > 0.1)) {
			console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")");
		}
	//	var best_frequency = sampleRate/best_offset;
	}
	*/

	var MIN_SAMPLES = 0;  // will be initialized when AudioContext is created.

	var autoCorrelate = function(buf, sampleRate) {
		var SIZE = buf.length;
		var MAX_SAMPLES = Math.floor(SIZE/2);
		var best_offset = -1;
		var best_correlation = 0;
		var rms = 0;
		var foundGoodCorrelation = false;
		var correlations = new Array(MAX_SAMPLES);

		for (var i=0;i<SIZE;i++) {
			var val = buf[i];
			rms += val*val;
		}
		rms = Math.sqrt(rms/SIZE);
		if (rms<0.01) // not enough signal
			return -1;

		var lastCorrelation=1;
		for (var offset = MIN_SAMPLES; offset < MAX_SAMPLES; offset++) {
			var correlation = 0;

			for (var i=0; i<MAX_SAMPLES; i++) {
				correlation += Math.abs((buf[i])-(buf[i+offset]));
			}
			correlation = 1 - (correlation/MAX_SAMPLES);
			correlations[offset] = correlation; // store it, for the tweaking we need to do below.
			if ((correlation>0.9) && (correlation > lastCorrelation)) {
				foundGoodCorrelation = true;
				if (correlation > best_correlation) {
					best_correlation = correlation;
					best_offset = offset;
				}
			} else if (foundGoodCorrelation) {
				// short-circuit - we found a good correlation, then a bad one, so we'd just be seeing copies from here.
				// Now we need to tweak the offset - by interpolating between the values to the left and right of the
				// best offset, and shifting it a bit.  This is complex, and HACKY in this code (happy to take PRs!) -
				// we need to do a curve fit on correlations[] around best_offset in order to better determine precise
				// (anti-aliased) offset.

				// we know best_offset >=1, 
				// since foundGoodCorrelation cannot go to true until the second pass (offset=1), and 
				// we can't drop into this clause until the following pass (else if).
				var shift = (correlations[best_offset+1] - correlations[best_offset-1])/correlations[best_offset];  
				return sampleRate/(best_offset+(8*shift));
			}
			lastCorrelation = correlation;
		}
		if (best_correlation > 0.01) {
			// console.log("f = " + sampleRate/best_offset + "Hz (rms: " + rms + " confidence: " + best_correlation + ")")
			return sampleRate/best_offset;
		}
		return -1;
	//	var best_frequency = sampleRate/best_offset;
	};

	var canvasHeight = 864;
		canvasWidth = 32766;
		maxPitch = 1047;

	var clearCanvas = function() {
		waveCanvas.clearRect(0,0,512,256);
	}

	var drawLine = function(pitchFreq, weight) {
		waveCanvas.fillRect(0, canvasHeight - pitchFreq * canvasHeight / maxPitch, canvasWidth, weight);
	}

	var drawWaveCanvasBg = function() {
		var timeBar = 400;
		for (var i = 1; timeBar*i <= canvasWidth; i++) {
			waveCanvas.fillStyle = "rgba(0, 0, 0, 0.2)";
			waveCanvas.fillRect(timeBar*i, 0, 2, canvasHeight);
		}

		var pitchFreq;
		var mainLineColor = "rgba(241, 242, 91, 1)";
		var subLineColor = "rgba(241, 242, 91, 0.3)";

		// C6 1046.5
		waveCanvas.fillStyle = mainLineColor;
		drawLine(1046.5, 2);
		waveCanvas.fillStyle = subLineColor;

		// B5 987.77
		drawLine(987.77, 1);

		// A5 880.00
		waveCanvas.fillStyle = mainLineColor;
		drawLine(880.00, 2);
		waveCanvas.fillStyle = subLineColor;

		// G5 783.99
		drawLine(783.99, 1);

		// F5 698.46
		drawLine(698.46, 1);

		// E5 659.26
		drawLine(659.26, 1);

		// D5 587.33
		drawLine(587.33, 1);

		// C5 523.25
		waveCanvas.fillStyle = mainLineColor;
		drawLine(523.25, 2);
		waveCanvas.fillStyle = subLineColor;

		// B4 493.88
		drawLine(493.88, 1);

		// A4 440
		waveCanvas.fillStyle = mainLineColor;
		drawLine(440, 2);
		waveCanvas.fillStyle = subLineColor;

		// G4 392
		drawLine(392, 1);

		// F4 349.23
		drawLine(349.23, 1);

		// E4 329.63
		drawLine(329.63, 1);

		// D4 293.66
		drawLine(293.66, 1);

		// C4 261.63
		waveCanvas.fillStyle = mainLineColor;
		drawLine(261.63, 2);
		waveCanvas.fillStyle = subLineColor;

		// B3 246.94
		drawLine(246.94, 1);		

		// A3 220.00
		waveCanvas.fillStyle = mainLineColor;
		drawLine(220.00, 2);
		waveCanvas.fillStyle = subLineColor;

		// G3 196.00
		drawLine(196.00, 1);

		// F3 174.61
		drawLine(174.61, 1);

		// E3 164.81
		drawLine(164.81, 1);

		// D3 146.83
		drawLine(146.83, 1);

		// C3 130.81
		waveCanvas.fillStyle = mainLineColor;
		drawLine(130.81, 2);
		waveCanvas.fillStyle = subLineColor;
		
		// B2 123.47
		drawLine(123.47, 1);

		// A2 110.00
		waveCanvas.fillStyle = mainLineColor;
		drawLine(110.00, 2);
		waveCanvas.fillStyle = subLineColor;

		// G2 97.999
		drawLine(97.999, 1);

		// F2 87.307
		drawLine(87.307, 1);

		// E2 82.407
		drawLine(82.407, 1);

		// D2 73.416
		drawLine(73.416, 1);

		// C2 65.406
		waveCanvas.fillStyle = mainLineColor;
		drawLine(65.406, 2);
		waveCanvas.fillStyle = subLineColor;
	}

	var drawWaveCanvas = function(pitch) {

		// clearCanvas();

		var scaledPitch = pitch * canvasHeight / maxPitch;
		if(scaledPitch > canvasHeight) { scaledNote = canvasHeight; }

		waveCanvas.fillStyle = "white";
		waveCanvas.fillRect(currentTime, canvasHeight-scaledPitch, 3, 3);
	}

	var canvasMarginLeft = 30;

	var updatePitch = function(time) {
		currentTime ++;

		if(currentTime > 800) {
			canvasMarginLeft -= 0.5;
			console.log(DEBUGCANVAS.style.marginLeft);
			DEBUGCANVAS.style.marginLeft = canvasMarginLeft + "px";
		}

		var cycles = new Array;
		analyser.getFloatTimeDomainData( buf );
		var ac = autoCorrelate( buf, audioContext.sampleRate );
		// TODO: Paint confidence meter on canvasElem here.

		var pitch;

	 	if (ac == -1) {
	 		detectorElem.className = "vague";
		 	pitchElem.innerText = "frequency";
			noteElem.innerText = "Note";
			detuneElem.className = "";
			detuneAmount.innerText = "detune";
	 	} else {
		 	detectorElem.className = "confident";
		 	pitch = ac;
		 	pitchElem.innerText = Math.round(pitch) + " Hz" ;
		 	var note =  noteFromPitch(pitch);
			noteElem.innerHTML = noteStrings[note%12] + Math.floor(note/12 - 1);
			var detune = centsOffFromPitch(pitch, note);
			if (detune == 0) {
				detuneElem.className = "";
				detuneAmount.innerHTML = "";
			} else {
				if (detune < 0)
					detuneElem.className = "flat";
				else
					detuneElem.className = "sharp";
				detuneAmount.innerHTML = Math.abs(detune);
			}
		}

		if (DEBUGCANVAS) {  // This draws the current waveform, useful for debugging
			drawWaveCanvas(pitch);
		}

		// if (!window.requestAnimationFrame)
		// 	window.requestAnimationFrame = window.webkitRequestAnimationFrame;
		rafID = window.setTimeout(updatePitch, 10);
	};

	return {
		init: init,
		liveInput: toggleLiveInput,
		playback: togglePlayback
	};

})();