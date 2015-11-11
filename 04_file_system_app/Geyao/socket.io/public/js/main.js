/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

	var socket;
    var fileNames;

	// Initializing socket and adding listener functions
	var socketSetup = function(callback){
		
		// Connect
	    socket = io.connect();

		// Listeners
		socket.on('welcome', function(data){
			alert(data);
		});
    window.onload = function() {
    var audio = new window.webkitAudioContext(),
        position = 0,
        scale = {
            a: 300,
            b: 310,
            c: 320,
            d: 330,
            e: 340,
            f: 350,
            g: 360,
            h: 370,
            i: 380,
            j: 390,
            k: 301,
            l: 312,
            m: 323,
            n: 334,
            o: 345,
            p: 356,
            q: 367,
            r: 378,
            s: 389,
            t: 400,
            u: 410,
            v: 420,
            w: 430,
            x: 440,
            y: 450,
            z: 460,

            ///////
            // g: 392,
            // f: 349.23,
            // e: 329.63,
            // b: 493.88
        },
        //song = "gfefgg-fff-gbb-gfefggggffgfe---";
        //song = "adajhdkashdksadhjkasdhakjsdhaskdhaiudhwqudhqoidhqoidajdhasdksahdkahdshdiuashduiasdhsadjsahdkjsahdqocfpoefjwoifcweoidhwdjwoidjdiajdks";
        song = 'fileNames';

    setInterval(play, 1000 / 4);

    function createOscillator(freq) {
        var attack = 10,
            decay = 250,
            gain = audio.createGain(),
            osc = audio.createOscillator();

        gain.connect(audio.destination);
        gain.gain.setValueAtTime(0, audio.currentTime);
        gain.gain.linearRampToValueAtTime(1, audio.currentTime + attack / 1000);
        gain.gain.linearRampToValueAtTime(0, audio.currentTime + decay / 1000);

        osc.frequency.value = freq;
        osc.type = "square";
        osc.connect(gain);
        osc.start(0);

        setTimeout(function() {
            osc.stop(0);
            osc.disconnect(gain);
            gain.disconnect(audio.destination);
        }, decay)
    }

    function play() {
        var note = song.charAt(position),
            freq = scale[note];
        position += 1;
        if(position >= song.length) {
            position = 0;
        }
        if(freq) {
            createOscillator(freq);
        }
    }
};
		socket.on('fileNameList', function(data){
           fileNames = data;

    $('body').append('<p>file name : ' + data+ '</p>');
		});

		// socket.on('hey-everybody', function(data){
		// 	$('body').append('<h3>'+data+'</h3>');
		// });

		socket.on('bye', function(data){
			$('body').append('<h3>'+data+'</h3>');
		});		
		
		socket.on('msg-to-clients', function(data){
			$('body').append('<p>' + data.id + ' says: ' + data.msg + '</p>');
		});

		// Call attachEvents
		callback();
	};

	var attachEvents = function(){
		$('#msg-box').keypress(function(e) {
			if (e.keyCode == 13) {
				socket.emit('msg-to-server', $('#msg-box').val());
			}
		});
	};	

	var init = function(){
		console.log('Initializing app.');

		socketSetup(attachEvents);	// Sending attachEvents as a callback	
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);