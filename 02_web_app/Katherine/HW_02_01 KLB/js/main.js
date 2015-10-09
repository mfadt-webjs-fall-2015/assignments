
        //Populate voice selection dropdown
        // var voicelist = responsiveVoice.getVoices();
 
        // var vselect = $("#voiceselection");
 
        // $.each(voicelist, function() {
        //         vselect.append($("<option />").val(this.name).text(this.name));








var instaOutput = document.getElementById("instaTag");


function instaRun() {
  instaOutput = document.getElementById("instaTag").value.replace(/[^\w]/gi, '');
  var feed = new Instafeed({
    get: 'tagged',
    tagName: instaOutput,
    limit: 1,
    clientId: '47f9a932bc55414581d700dd4b925838',
    template: '<div class="item"><a href="{{link}}"></div><div class="img-wrap"><img class="instaimg" src="{{image}}" /></div></a></div>',
    resolution: 'standard_resolution',
    sortBy: 'most-recent',
    before: function() {
      instaOutput = document.getElementById("instaTag").value.replace(/[^\w]/gi, '');
      if (document.getElementById("instaTag").value === "") {
        document.getElementById("instafeed").innerHTML = "<p class='error'>UHOH... <strong>#yolo</strong></p>";
      } else {
        document.getElementById("instafeed").innerHTML = "";
      }
    },
  });
  feed.run();
  return false;
}
window.onload = function() {
  if (instaOutput.value === null || instaOutput.value === "") {
    instaOutput.value = "dribbble";
  }
  document.getElementById("instafeed").innerHTML = "";
  instaRun();
}





//SECOND SEARCH

var instaOutput = document.getElementById("instaTag2");


function instaRun2() {
  instaOutput = document.getElementById("instaTag2").value.replace(/[^\w]/gi, '');
  var feed = new Instafeed({
    get: 'tagged',
    tagName: instaOutput,
    limit: 1,
    clientId: '47f9a932bc55414581d700dd4b925838',
    template: '<div class="item"><a href="{{link}}"></div><div class="img-wrap"><img class="instaimg" src="{{image}}" /></div></a></div>',
    resolution: 'standard_resolution',
    sortBy: 'most-recent',
    before: function() {
      instaOutput = document.getElementById("instaTag2").value.replace(/[^\w]/gi, '');
      if (document.getElementById("instaTag2").value === "") {
        document.getElementById("instafeed2").innerHTML = "<p class='error'>UHOH... <strong>#yolo</strong></p>";
      } else {
        document.getElementById("instafeed2").innerHTML = "";
      }
    },
  });
  feed.run();
  return false;
}
window.onload = function() {
  if (instaOutput.value === null || instaOutput.value === "") {
    instaOutput.value = "dribbble";
  }
  document.getElementById("instafeed2").innerHTML = "";
  instaRun2();
}



//THIRD SEARCH  

var instaOutput = document.getElementById("instaTag3");


function instaRun3() {
  instaOutput = document.getElementById("instaTag3").value.replace(/[^\w]/gi, '');
  var feed = new Instafeed({
    get: 'tagged',
    tagName: instaOutput,
    limit: 1,
    clientId: '47f9a932bc55414581d700dd4b925838',
    template: '<div class="item"><a href="{{link}}"></div><div class="img-wrap"><img class="instaimg" src="{{image}}" /></div></a></div>',
    resolution: 'standard_resolution',
    sortBy: 'most-recent',
    before: function() {
      instaOutput = document.getElementById("instaTag3").value.replace(/[^\w]/gi, '');
      if (document.getElementById("instaTag3").value === "") {
        document.getElementById("instafeed3").innerHTML = "<p class='error'>UHOH... <strong>#yolo</strong></p>";
      } else {
        document.getElementById("instafeed3").innerHTML = "";
      }
    },
  });
  feed.run();
  return false;
}
window.onload = function() {
  if (instaOutput.value === null || instaOutput.value === "") {
    instaOutput.value = "dribbble";
  }
  document.getElementById("instafeed3").innerHTML = "";
  instaRun3();
}



//FOURTH SEARCH  

var instaOutput = document.getElementById("instaTag4");


function instaRun4() {
  instaOutput = document.getElementById("instaTag4").value.replace(/[^\w]/gi, '');
  var feed = new Instafeed({
    get: 'tagged',
    tagName: instaOutput,
    limit: 1,
    clientId: '47f9a932bc55414581d700dd4b925838',
    template: '<div class="item"><a href="{{link}}"></div><div class="img-wrap"><img class="instaimg" src="{{image}}" /></div></a></div>',
    resolution: 'standard_resolution',
    sortBy: 'most-recent',
    before: function() {
      instaOutput = document.getElementById("instaTag4").value.replace(/[^\w]/gi, '');
      if (document.getElementById("instaTag4").value === "") {
        document.getElementById("instafeed4").innerHTML = "<p class='error'>UHOH... <strong>#yolo</strong></p>";
      } else {
        document.getElementById("instafeed4").innerHTML = "";
      }
    },
  });
  feed.run();
  return false;
}
window.onload = function() {
  if (instaOutput.value === null || instaOutput.value === "") {
    instaOutput.value = "dribbble";
  }
  document.getElementById("instafeed4").innerHTML = "";
  instaRun4();
}



//FIFTH SEARCH  

var instaOutput = document.getElementById("instaTag5");


function instaRun5() {
  instaOutput = document.getElementById("instaTag5").value.replace(/[^\w]/gi, '');
  var feed = new Instafeed({
    get: 'tagged',
    tagName: instaOutput,
    limit: 1,
    clientId: '47f9a932bc55414581d700dd4b925838',
    template: '<div class="item"><a href="{{link}}"></div><div class="img-wrap"><img class="instaimg" src="{{image}}" /></div></a></div>',
    resolution: 'standard_resolution',
    sortBy: 'most-recent',
    before: function() {
      instaOutput = document.getElementById("instaTag5").value.replace(/[^\w]/gi, '');
      if (document.getElementById("instaTag5").value === "") {
        document.getElementById("instafeed5").innerHTML = "<p class='error'>UHOH... <strong>#yolo</strong></p>";
      } else {
        document.getElementById("instafeed5").innerHTML = "";
      }
    },
  });
  feed.run();
  return false;
}
window.onload = function() {
  if (instaOutput.value === null || instaOutput.value === "purple") {
    instaOutput.value = "dribbble";
  }
  document.getElementById("instafeed5").innerHTML = "";
  instaRun5();
}


//SIXTH SEARCH  

var instaOutput = document.getElementById("instaTag6");


function instaRun6() {
  instaOutput = document.getElementById("instaTag6").value.replace(/[^\w]/gi, '');
  var feed = new Instafeed({
    get: 'tagged',
    tagName: instaOutput,
    limit: 1,
    clientId: '47f9a932bc55414581d700dd4b925838',
    template: '<div class="item"><a href="{{link}}"></div><div class="img-wrap"><img class="instaimg" src="{{image}}" /></div></a></div>',
    resolution: 'standard_resolution',
    sortBy: 'most-recent',
    before: function() {
      instaOutput = document.getElementById("instaTag6").value.replace(/[^\w]/gi, '');
      if (document.getElementById("instaTag6").value === "") {
        document.getElementById("instafeed6").innerHTML = "<p class='error'>UHOH... <strong>#yolo</strong></p>";
      } else {
        document.getElementById("instafeed6").innerHTML = "";
      }
    },
  });
  feed.run();
  return false;
}
window.onload = function() {
  if (instaOutput.value === null || instaOutput.value === "") {
    instaOutput.value = "dribbble";
  }
  document.getElementById("instafeed6").innerHTML = "";
  instaRun6();
}







function Generatestory()
      {

      
        var instaValue = document.getElementById('instaTag').value;
        var instaValue2 = document.getElementById('instaTag2').value;
        var instaValue3 = document.getElementById('instaTag3').value;
        var instaValue4 = document.getElementById('instaTag4').value;
        var instaValue5 = document.getElementById('instaTag5').value;
        // var instaValue6 = document.getElementById('instaTag6').value;
        // var instaValue5 = document.getElementById('instaTag5').value;
        // var instaValue6 = document.getElementById('instaTag6').value;
       


          document.getElementById('story_instaTag').innerHTML = instaValue;
          document.getElementById('story_instaTag2').innerHTML = instaValue2;
          document.getElementById('story_instaTag3').innerHTML = instaValue3;
          document.getElementById('story_instaTag4').innerHTML = instaValue4;
             document.getElementById('story_instaTag5').innerHTML = instaValue5;
          // document.getElementById('story_instaTag6').innerHTML = instaValue6;
          // document.getElementById('story_instaTag5').innerHTML = instaValue5;
          //   document.getElementById('story_instaTag6').innerHTML = instaValue6;
          
          document.getElementById('story').style.visibility = 'visible';
        }
