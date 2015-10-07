//WEB APP HW: Monster Land
//Interactive environment: explore to create sounds, "play" with monsters, and change the weather

 var exclaim = $('#Exclaim');
   function loop() {
       exclaim.animate({left: '+=10px', bottom: '+=10px'}, 800, "swing");
       exclaim.animate({left: '-=10px', bottom: '-=10px'}, 800, "swing", loop);
   }

   loop();

  ///sounds

  var audio = $("#sound-1")[0];
  var audio2 = $("#sound-2")[0];
  var audio3 = $("#sound-3")[0];
  var audio4 = $("#sound-4")[0];
  var audio5 = $("#sound-5")[0];
   var audio6 = $("#sound-6")[0];

   audio6.loop=true;
   audio6.play();

$("#soundBubble").mouseenter(function() {
 	$("#soundBubble").fadeTo(500, 0.5);
  	audio.play();
});

$("#soundBubble").mouseleave(function() {
 	$("#soundBubble").fadeTo(500, 0.1);
});

$("#soundBubble2").mouseenter(function() {
 	$("#soundBubble2").fadeTo(500, 0.5);
  	audio2.play();
});

$("#soundBubble2").mouseleave(function() {
 	$("#soundBubble2").fadeTo(500, 0.1);
});

$("#soundBubble3").mouseenter(function() {
 	$("#soundBubble3").fadeTo(500, 0.5);
  	audio3.play();
});

$("#soundBubble3").mouseleave(function() {
 	$("#soundBubble3").fadeTo(500, 0.1);
});

$("#soundBubble4").mouseenter(function() {
 	$("#soundBubble4").fadeTo(500, 0.5);
  	audio4.play();
});

$("#soundBubble4").mouseleave(function() {
 	$("#soundBubble4").fadeTo(500, 0.1);
});




///monsters animation


var monster = $(document).ready(function(){

    $("#MonsterDiv").mouseenter(function(){

        $("#Monster1").animate({left: '+=60px', bottom: '+=60px'}, "slow", "swing");
        $("#Monster1Winter").animate({left: '+=60px', bottom: '+=60px'}, "slow", "swing");
        //$("#VineParent").css({'transform': 'rotate('+30+'deg)'});
        $("#Exclaim").fadeTo(200, 0);

    });
    $("#MonsterDiv").mouseleave(function(){
    	 $("#Monster1").animate({left: '-=60px', bottom: '-=60px'}, "slow", "swing");
    	 $("#Monster1Winter").animate({left: '-=60px', bottom: '-=60px'}, "slow", "swing");
    	$("#Exclaim").fadeTo(400, 1);

    });


});



$(document).ready(function(){

    $("#YellowDiv").mouseenter(function(){

        $("#Yellow").animate({bottom: '+=40px'}, "slow", "swing");
         $("#YellowWinter").animate({bottom: '+=40px'}, "slow", "swing");
        //$("#VineParent").css({'transform': 'rotate('+30+'deg)'});
    });
    $("#YellowDiv").mouseleave(function(){
    	 $("#Yellow").animate({bottom: '-=40px'}, "slow", "swing");
    	 $("#YellowWinter").animate({bottom: '-=40px'}, "slow", "swing");

    });
});


//changing rays'opacity on hover, I broke this somewhere, but it doesn't affect the functionality of the code
 $(document).ready(function(){
        $("#Ray1").mouseenter(function(){

        	$("#Ray1").fadeTo(400, 0.5);

        });

        $("#Ray1").mouseleave(function(){

        	$("#Ray1").fadeTo(400, 0.2);

        });

                $("#Ray2").mouseenter(function(){

        	$("#Ray2").fadeTo(400, 0.8);

        });

        $("#Ray2").mouseleave(function(){

        	$("#Ray2").fadeTo(400, 0.5);

        });

        $("#Ray3").mouseenter(function(){

        	$("#Ray3").fadeTo(400, 0.8);

        });

        $("#Ray3").mouseleave(function(){

        	$("#Ray3").fadeTo(400, 0.5);

        });

});

////snow
function floatingSnow() {
        var $snowball = $(),
            createSnow = function () {
                var qt = 10;
                for (var i = 0; i < qt; ++i) {
                    var $newSnow = $('<div class="snowball"></div>');
                    $newSnow.css({
                        'left': (Math.random() * $('#site').width()) + 'px',
                        'top': (- Math.random() * $('#site').height()) + 'px'
                    });
                    
                    $snowball = $snowball.add($newSnow);
                }
                $('#snowZone').prepend($snowball);
            },
            
            moveSnow = function() {
                $snowball.each(function() {
                    
                    var singleAnimation = function($float) {
                        $float.animate({
                            top: "800px",
                            opacity : "0",
                        }, Math.random()*-2500 + 5000, function(){
                            // this particular snow flake has finished, restart again
                            $float.css({
                                'left': (Math.random() * $('#site').width()) + 'px',
                                'top': (- Math.random() * $('#site').height()) + 'px',
                                'opacity': 1
                            });
                            singleAnimation($float);
                        });
                    };
                    singleAnimation($(this));
                });
        };
        
       createSnow();
        moveSnow();
    }

    ////Click to start "winter"
    ////tried to make it toggle so I could switch back to non-winter, but didn't work. ): 
$('#topBar').on('click',function(){

	  floatingSnow();

      audio5.loop=true;
      audio5.play();

      $('#sound-6').animate({volume: 0}, 1000);

	  $('#Monster1Winter').fadeTo(2000, 1);
	  $('#Monster1').fadeTo(4000, 0);
	  $('#YellowWinter').fadeTo(1000, 1);
	  $('#Yellow').fadeTo(1000, 0);

	  $('#Rock1Winter').fadeTo(2000, 1);
	  $('#Rock1').fadeTo(4000, 0);
	  $('#Rock2Winter').fadeTo(2000, 1);
	  $('#Rock2').fadeTo(4000, 0);
	  $('#ArchWinter').fadeTo(2000, 1);
	  $('#Arch').fadeTo(4000, 0);

	  $('#Vine2Winter').fadeTo(2000, 1);
	  $('#Vine2').fadeTo(4000, 0);

	  $('#Flower').fadeTo(4000, 0.5);
	  $('#Flower2').fadeTo(4000, 0.5);

	  $('#Ray1Winter').fadeTo(4000, 0.3);
	  $('#Ray1').fadeTo(4000, 0);
	  $('#Ray2Winter').fadeTo(4000, 0.1);
	  $('#Ray2').fadeTo(4000, 0);
	  $('#Ray3Winter').fadeTo(4000, 0.2);
	  $('#Ray3').fadeTo(4000, 0);

	  $('#MushroomsWinter').fadeTo(4000, 1);
	  $('#Mushrooms').fadeTo(4000, 0);

	   $('#LoopWinter').fadeTo(4000, 1);
	  $('#Loop').fadeTo(4000, 0);
	  $('#WinterBackground').fadeIn(4000);

	  $('#topBar').fadeTo(4000, 0);



})

