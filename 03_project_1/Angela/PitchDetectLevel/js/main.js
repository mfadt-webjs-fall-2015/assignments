var app = app || {};

app.main = (function(){

	var songs = null;

	var init = function() {
		// PitchDetect.init("sounds/Birthday.wav");
		// PitchDetect.init("sounds/whistling3.ogg");
		// PitchDetect.init("sounds/music_box_happy_birthday_NifterDotCom.wav");
		detect();

		loadSongs();
	};

	var detect = function() {
		$("#playback").on('click', PitchDetect.playback);
		$("#live-input").on('click', PitchDetect.liveInput);
		$("#both").on('click', function(){
			PitchDetect.playback();
			PitchDetect.liveInput();
		});
		$("#cancel").on('click', function(){
			PitchDetect.abort();
		});
	};

	var loadSongs = function() {
		var request = new XMLHttpRequest();

		request.open("GET", "songs.json", true);
		request.responseType = "json";
		request.onload = function(){
			$("#load-hint-menu").remove();

			songs = request.response;

			var tableHTML = '<table id="songs">';

			tableHTML += '<tr><td colspan="4"><button id="test-sing">Test sing without a song!</button></td></tr>'

			tableHTML += '<tr style="color:rgba(255,255,255,0.3);"><th>NAME</th><th>LENGTH</th><th>DIFFICULTY</th><th>TRY IT!</th>';

			for(var i = 0; i < songs.length; i++){
				var song = songs[i];
				var tr = '<tr>' +
					'<td class="cell song-name">' + song.name + '</td>' +
					'<td class="cell">' + song.length + '</td>' +
					'<td class="cell">' + song.difficulty + '</td>' +
					'<td class="cell"><div class="song-loading" data-idx="' + i + '">Loading song file...</div></td>' +
					'</tr>';

				tableHTML += tr;
			}

			

			tableHTML += '</table>'

			$("#menu").html($("#menu").html() + tableHTML);

			for(var i = 0; i < songs.length; i++){
				var song = songs[i];

				PitchDetect.loadFile(song.file, function(buffer, idx){ /* shouldn't be creating functions inside loop */
					songs[idx].buffer = buffer;

					var td = $('.song-loading[data-idx="' + idx + '"]').parent();

					$('.song-loading[data-idx="' + idx + '"]').remove();

					td.html('<button class="song-play" data-idx="' + idx + '">Play it!</button>');

					$('.song-play[data-idx="' + idx + '"]').click(function(){
						var songIdx = $(this).data('idx');
						playSong(songIdx);
					});
				}, i);
			}


			$("#test-sing").click(function(){
				PitchDetect.init(songs[0].buffer); // hack with song[0] for init
				$("#live-input").show();
				$("#both").hide();
				$("#menu").slideToggle();
				$("#main").slideToggle();
			});
		};

		request.send();
	};

	var playSong = function(idx) {
		var song = songs[idx];
		$("#live-input").hide();
		$("#both").show();
		PitchDetect.init(song.buffer);
		$("#menu").slideToggle();
		$("#main").slideToggle();
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);