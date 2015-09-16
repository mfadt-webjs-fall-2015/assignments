var app = app || {};

app.main = (function(){

	var init = function() {
		PitchDetect.init("sounds/Ode_to_Joy.wav");
		// PitchDetect.init("sounds/whistling3.ogg");
		// PitchDetect.init("sounds/music_box_happy_birthday_NifterDotCom.wav");
		detect();
	};

	var detect = function() {
		$("#playback").on('click', PitchDetect.playback);
		$("#live-input").on('click', PitchDetect.liveInput);
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);