// var drawScene1 = function (){

// }
// var melodyHover = $(document).ready(function(){
//   $("#melody_tab").mouseenter(function(){

//       $("#melody_tab").animate({height: '+=60px' },"slow", "swing");
//       $("#harmony_tab").animate({height: '-=60px' },"slow", "swing");

//   });

//     $("#melody_tab").mouseleave(function(){

//       $("#melody_tab").animate({height: '-=60px'}, "slow", "swing");
//        $("#harmony_tab").animate({height: '+=60px'}, "slow", "swing");
  
//   });

//   });

  var mozart1 = $("#mozart-1")[0];
  var mozart2 = $("#mozart-2")[0];
  var mozart3 = $("#mozart-3")[0];
  var mozart4 = $("#mozart-4")[0];
  var mozart5 = $("#mozart-5")[0];
  var mozart6 = $("#mozart-6")[0];
  var mozart7 = $("#mozart-7")[0];

  var ravel1 = $("#ravel-1")[0];
  var ravel2 = $("#ravel-2")[0];
  var ravel3 = $("#ravel-3")[0];
  var ravel4 = $("#ravel-4")[0];
  var ravel5 = $("#ravel-5")[0];
  var ravel6 = $("#ravel-6")[0];
  var ravel7 = $("#ravel-7")[0];
  var ravel8 = $("#ravel-8")[0];
  var ravel9 = $("#ravel-9")[0];

  var mozartharmony1 = $("#mozartharmony1")[0];
  var mozartharmony2 = $("#mozartharmony2")[0];
  var mozartharmony3 = $("#mozartharmony3")[0];
  var mozartharmony4 = $("#mozartharmony4")[0];
  var mozartharmony5 = $("#mozartharmony5")[0];
  var mozartharmony6 = $("#mozartharmony6")[0];
  var mozartharmony7 = $("#mozartharmony7")[0];
  var mozartharmony8 = $("#mozartharmony8")[0];

  var ravelharmony1 = $("#ravelharmony1")[0];
  var ravelharmony2 = $("#ravelharmony2")[0];
  var ravelharmony3 = $("#ravelharmony3")[0];
  var ravelharmony4 = $("#ravelharmony4")[0];

var melodymonster = $(document).ready(function(){

    $("#monster1div").mouseenter(function(){

        $("#monster1").animate({top: '+=50px'}, "slow", "swing");
        $("#speech2").animate({top: '+=30px'}, "slow", "swing");
        //$("#VineParent").css({'transform': 'rotate('+30+'deg)'});
        $("#speech2").fadeTo(200, 1);

    });
    $("#monster1div").mouseleave(function(){
       $("#monster1").animate({top: '-=50px'}, "slow", "swing");
       $("#speech2").animate({top: '-=30px'}, "slow", "swing");
       //$("#Monster1Winter").animate({left: '-=60px', bottom: '-=60px'}, "slow", "swing");
      $("#speech2").fadeTo(400, 0);

    });


});
var harmonymonster = $(document).ready(function(){

    $("#monsterdiv").mouseenter(function(){

        $("#monster").animate({bottom: '-=40px'}, "slow", "swing");
       
        $("#speech1").fadeTo(400, 1);

    });
    $("#monsterdiv").mouseleave(function(){
       $("#monster").animate({bottom: '+=40px'}, "slow", "swing");
       //$("#Monster1Winter").animate({left: '-=60px', bottom: '-=60px'}, "slow", "swing");
      $("#speech1").fadeTo(400, 0);

    });


});


///tried doing add/remove CSS class, but didn't work ):
var chord = $(document).ready(function(){
      $("#chord1").mouseenter(function() {
      $("#chord1").fadeTo(1000, 1);
      mozartharmony1.play();
});

      $("#chord1").mouseleave(function() {
      $("#chord1").fadeTo(1000, 0.5);
    //mozart.play();
});

      $("#chord2").mouseenter(function() {
      $("#chord2").fadeTo(1000, 1);
      mozartharmony2.play();
});

      $("#chord2").mouseleave(function() {
      $("#chord2").fadeTo(1000, 0.5);
    //mozart.play();
});

      $("#chord3").mouseenter(function() {
      $("#chord3").fadeTo(1000, 1);
      mozartharmony3.play();
});

      $("#chord3").mouseleave(function() {
      $("#chord3").fadeTo(1000, 0.5);
    //mozart.play();
});

      $("#chord4").mouseenter(function() {
      $("#chord4").fadeTo(1000, 1);
      mozartharmony4.play();
});

      $("#chord4").mouseleave(function() {
      $("#chord4").fadeTo(1000, 0.5);
    //mozart.play();
});

      $("#chord5").mouseenter(function() {
      $("#chord5").fadeTo(1000, 1);
      mozartharmony5.play();
});

      $("#chord5").mouseleave(function() {
      $("#chord5").fadeTo(1000, 0.5);
    //mozart.play();
});

      $("#chord6").mouseenter(function() {
      $("#chord6").fadeTo(1000, 1);
      mozartharmony6.play();
});

      $("#chord6").mouseleave(function() {
      $("#chord6").fadeTo(1000, 0.5);
    //mozart.play();
});
      $("#chord7").mouseenter(function() {
      $("#chord7").fadeTo(1000, 1);
      mozartharmony7.play();
});

      $("#chord7").mouseleave(function() {
      $("#chord7").fadeTo(1000, 0.5);
    //mozart.play();
});
      $("#chord8").mouseenter(function() {
      $("#chord8").fadeTo(1000, 1);
      mozartharmony8.play();
});

      $("#chord8").mouseleave(function() {
      $("#chord8").fadeTo(1000, 0.5);
    //mozart.play();
});

      $("#ravel1").mouseenter(function() {
      $("#ravel1").fadeTo(1000, 1);
      ravelharmony1.play();
});

      $("#ravel1").mouseleave(function() {
      $("#ravel1").fadeTo(1000, 0.5);
      
})

      $("#ravel2").mouseenter(function() {
      $("#ravel2").fadeTo(1000, 1);
      ravelharmony2.play();
});

      $("#ravel2").mouseleave(function() {
      $("#ravel2").fadeTo(1000, 0.5);
    //mozart.play();
})

      $("#ravel3").mouseenter(function() {
      $("#ravel3").fadeTo(1000, 1);
    ravelharmony1.play();
});

      $("#ravel3").mouseleave(function() {
      $("#ravel3").fadeTo(1000, 0.5);
    //mozart.play();
})

      $("#ravel4").mouseenter(function() {
      $("#ravel4").fadeTo(1000, 1);
    ravelharmony2.play();
});

      $("#ravel4").mouseleave(function() {
      $("#ravel4").fadeTo(1000, 0.5);
    //mozart.play();
})

      $("#ravel5").mouseenter(function() {
      $("#ravel5").fadeTo(1000, 1);
      ravelharmony1.play();
});

      $("#ravel5").mouseleave(function() {
      $("#ravel5").fadeTo(1000, 0.5);
    //mozart.play();
})

      $("#ravel6").mouseenter(function() {
      $("#ravel6").fadeTo(1000, 1);
      ravelharmony2.play();
});

      $("#ravel6").mouseleave(function() {
      $("#ravel6").fadeTo(1000, 0.5);
    //mozart.play();
})

      $("#ravel7").mouseenter(function() {
      $("#ravel7").fadeTo(1000, 1);
      ravelharmony1.play();
});

      $("#ravel7").mouseleave(function() {
      $("#ravel7").fadeTo(1000, 0.5);
    //mozart.play();
})

      $("#ravel8").mouseenter(function() {
      $("#ravel8").fadeTo(1000, 1);
      ravelharmony3.play();
});

      $("#ravel8").mouseleave(function() {
      $("#ravel8").fadeTo(1000, 0.5);
    //mozart.play();
})

      $("#ravel9").mouseenter(function() {
      $("#ravel9").fadeTo(1000, 1);
      ravelharmony4.play();
});

      $("#ravel9").mouseleave(function() {
      $("#ravel9").fadeTo(1000, 0.5);
    //mozart.play();
})

      $("#MozartKey1").mouseenter(function() {
      $("#MozartKey1").fadeTo(1000, 1);
      mozart1.play();
});

      $("#MozartKey1").mouseleave(function() {
      $("#MozartKey1").fadeTo(1000, 0.5);
      
})

      $("#MozartKey2").mouseenter(function() {
      $("#MozartKey2").fadeTo(1000, 1);
      mozart2.play();
});

      $("#MozartKey2").mouseleave(function() {
      $("#MozartKey2").fadeTo(1000, 0.5);
      
})
      $("#MozartKey3").mouseenter(function() {
      $("#MozartKey3").fadeTo(1000, 1);
      mozart3.play();
});

      $("#MozartKey3").mouseleave(function() {
      $("#MozartKey3").fadeTo(1000, 0.5);
    
})
      $("#MozartKey4").mouseenter(function() {
      $("#MozartKey4").fadeTo(1000, 1);
      mozart4.play();
});

      $("#MozartKey4").mouseleave(function() {
      $("#MozartKey4").fadeTo(1000, 0.5);
    
})
      $("#MozartKey5").mouseenter(function() {
      $("#MozartKey5").fadeTo(1000, 1);
      mozart5.play();
});

      $("#MozartKey5").mouseleave(function() {
      $("#MozartKey5").fadeTo(1000, 0.5);
    //mozart.play();
})
      $("#MozartKey6").mouseenter(function() {
      $("#MozartKey6").fadeTo(1000, 1);
      mozart6.play();
});

      $("#MozartKey6").mouseleave(function() {
      $("#MozartKey6").fadeTo(1000, 0.5);
    //mozart.play();
})
      $("#MozartCadence").mouseenter(function() {
      $("#MozartKey7").fadeTo(500, 1);
      $("#MozartKey8").delay(800).fadeTo(500, 1);
      $("#MozartKey9").delay(1200).fadeTo(500, 1);
      $("#MozartKey10").delay(2000).fadeTo(500, 1);

      mozart7.play();
});

      $("#MozartCadence").mouseleave(function() {
      $("#MozartKey7").fadeTo(500, 0.5);
      $("#MozartKey10").fadeTo(500, 0.5);
      $("#MozartKey9").fadeTo(500, 0.5);
      $("#MozartKey8").fadeTo(500, 0.5);
    //mozart.play();
})
//       $("#MozartKey8").mouseenter(function() {
//       $("#MozartKey8").fadeTo(500, 1);
//     //mozart.play();
// });

//       $("#MozartKey8").mouseleave(function() {
//       $("#MozartKey8").fadeTo(500, 0.5);
//     //mozart.play();
// })
//       $("#MozartKey9").mouseenter(function() {
//       $("#MozartKey9").fadeTo(500, 1);
//     //mozart.play();
// });

//       $("#MozartKey9").mouseleave(function() {
//       $("#MozartKey9").fadeTo(500, 0.5);
//     //mozart.play();
// })

//       $("#MozartKey10").mouseenter(function() {
//       $("#MozartKey10").fadeTo(500, 1);
//     //mozart.play();
// });

//       $("#MozartKey10").mouseleave(function() {
//       $("#MozartKey10").fadeTo(500, 0.5);
//     //mozart.play();
// })

      $("#RavelKey1").mouseenter(function() {
      $("#RavelKey1").fadeTo(1000, 1);
      ravel1.play();
});

      $("#RavelKey1").mouseleave(function() {
      $("#RavelKey1").fadeTo(1000, 0.5);
    //mozart.play();
})

      $("#RavelKey2").mouseenter(function() {
      $("#RavelKey2").fadeTo(1000, 1);
    ravel2.play();
});

      $("#RavelKey2").mouseleave(function() {
      $("#RavelKey2").fadeTo(1000, 0.5);
    //mozart.play();
})
      $("#RavelKey3").mouseenter(function() {
      $("#RavelKey3").fadeTo(1000, 1);
    ravel3.play();
});

      $("#RavelKey3").mouseleave(function() {
      $("#RavelKey3").fadeTo(1000, 0.5);
    //mozart.play();
})
      $("#RavelKey4").mouseenter(function() {
      $("#RavelKey4").fadeTo(1000, 1);
    ravel4.play();
});

      $("#RavelKey4").mouseleave(function() {
      $("#RavelKey4").fadeTo(1000, 0.5);
    //mozart.play();
})
      $("#RavelKey5").mouseenter(function() {
      $("#RavelKey5").fadeTo(1000, 1);
    ravel6.play();
});

      $("#RavelKey5").mouseleave(function() {
      $("#RavelKey5").fadeTo(1000, 0.5);
    //mozart.play();
})
      $("#RavelKey6").mouseenter(function() {
      $("#RavelKey6").fadeTo(1000, 1);
    ravel7.play();
});

      $("#RavelKey6").mouseleave(function() {
      $("#RavelKey6").fadeTo(1000, 0.5);
    //mozart.play();
})
      $("#RavelKey7").mouseenter(function() {
      $("#RavelKey7").fadeTo(1000, 1);
    ravel8.play();
});

      $("#RavelKey7").mouseleave(function() {
      $("#RavelKey7").fadeTo(1000, 0.5);
    //mozart.play();
})
      $("#RavelCadence").mouseenter(function() {
      $("#RavelKey8").fadeTo(1000, 1);
      $("#RavelKey9").delay(1500).fadeTo(500, 1);
    ravel9.play();
});

      $("#RavelCadence").mouseleave(function() {
      $("#RavelKey8").fadeTo(500, 0.5);
      $("#RavelKey9").delay(1500).fadeTo(500, 0.5);
    //mozart.play();
})
//       $("#RavelKey9").mouseenter(function() {
//       $("#RavelKey9").fadeTo(500, 1);
    
// });

//       $("#RavelKey9").mouseleave(function() {
//       $("#RavelKey9").fadeTo(500, 0.5);
//     //mozart.play();
// })
});



////snow
function itsRaining() {
        var $rainDrop = $(),
            createRain = function () {
                var qt = 10;
                for (var i = 0; i < qt; ++i) {
                    var $newRain = $('<div class="rainDrop"></div>');
                    $newRain.css({
                        'left': (Math.random() * $('#site').width()) + 'px',
                        'top': (- Math.random() * $('#site').height()) + 'px'
                    });
                    
                    $rainDrop = $rainDrop.add($newRain);
                }
                $('#rainZone').prepend($rainDrop);
            },
            
            moveRain = function() {
                $rainDrop.each(function() {
                    
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
        
       createRain();
        moveRain();
    }
itsRaining();
/////changing tonality and piece depending on the weather

jQuery(document).ready(function($) {
  $.ajax({
  url : "http://api.wunderground.com/api/e48bbd79a2fd8003/geolookup/conditions/q/NY/New_York.json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var weather = parsed_json['current_observation']['weather'];
  console.log("Current weather in " + location + " is: " + weather);
  

  if(weather !== "Clear"){
  console.log("minor time")

       // $(".rainDrop").show();

        $(".mozartmelody").hide(2000, "swing");
        $(".ravelmelody").show(2000, "swing");

        $(".mozart").hide(2000, "swing");
        $(".ravel").show(2000, "swing");
 
  } else {
  console.log("major time")

       // $(".rainDrop").hide();

        $(".mozartmelody").show(2000, "swing");
        $(".ravelmelody").hide(2000, "swing");

        $(".mozart").show(2000, "swing");
        $(".ravel").hide(2000, "swing");

}
}
  });

});

///overriding API to showcase both environments
///HARMONY

var drawMozart = $(document).ready(function(){

  $("#mozartbutton").click(function(){
        $("#mozartbutton").fadeTo(500, 1);
        $(".mozart").show(2000, "swing");
        $(".ravel").hide(2000, "swing");
     // $(".ravel").show();

});

  $("#mozartbutton").mouseenter(function(){
    $("#mozartbutton").fadeTo(200, 0.6);
  });
   $("#mozartbutton").mouseleave(function(){
    $("#mozartbutton").fadeTo(200, 0.3);
  });

});
var drawRavel = $(document).ready(function(){
  $("#ravelbutton").click(function(){
    console.log("clicked ravel");
        $(".mozart").hide(2000, "swing");
        $(".ravel").show(2000, "swing");
     // $(".ravel").show();

});
    $("#ravelbutton").mouseenter(function(){
    $("#ravelbutton").fadeTo(200, 0.6);
  });
   $("#ravelbutton").mouseleave(function(){
    $("#ravelbutton").fadeTo(200, 0.3);
  });

});

///overriding API to showcase both environments
///MELODY

var drawMozartMelody = $(document).ready(function(){
  $("#sunnybutton").click(function(){
    console.log("clicked mozart");
       //$(".rainDrop").hide();
        $(".mozartmelody").show(2000, "swing");
        $(".ravelmelody").hide(2000, "swing");
     // $(".ravel").show();

});

  $("#sunnybutton").mouseenter(function(){
    $("#sunnybutton").fadeTo(200, 0.6);
  });
   $("#sunnybutton").mouseleave(function(){
    $("#sunnybutton").fadeTo(200, 0.3);
  });
});
var drawRavelMelody = $(document).ready(function(){
  $("#rainybutton").click(function(){
    console.log("clicked ravel");
       // $(".rainDrop").show();
        $(".mozartmelody").hide(2000, "swing");
        $(".ravelmelody").show(2000, "swing");
     // $(".ravel").show();

});

   $("#rainybutton").mouseenter(function(){
    $("#rainybutton").fadeTo(200, 0.6);
  });
   $("#rainybutton").mouseleave(function(){
    $("#rainybutton").fadeTo(200, 0.3);
  });

});