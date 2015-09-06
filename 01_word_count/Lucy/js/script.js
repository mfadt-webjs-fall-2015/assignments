var line1, line2, line3, line4;
var checkedLine1 = false,
	checkedLine2 = false,
	checkedLine3 = false,
	checkedLine4 = false;
var lineWords = [];
var words = [];
var counts = [];

// check each word in the array of input
function calculate(result) {
    for (var i = 0; i < result.length; i++) {
        var check = 0;
        for (var j = 0; j < words.length; j++) {
            if (result[i] == words[j]) {
                check = 1;
                ++counts[j];
            }
        }
        if (check == 0) {
            words.push(result[i]);
            counts.push(1);
        }
        check = 0;
    }
    for (var i = 0; i < result.length; i++) {
    	console.log(words[i] + ': ' + counts[i]);
    }
}
function stringArrays() {
	// convert input lines into an array of words
	var words1 = line1.split(" ");
	var words2 = line2.split(" ");
	var words3 = line3.split(" ");
	var words4 = line4.split(" ");

	// combine the four arrays
	$.merge(lineWords, words1);
	$.merge(lineWords, words2);
	$.merge(lineWords, words3);
	$.merge(lineWords, words4);

	calculate(lineWords);
}
// error alert if incorrect number of words input
function error() {
	$('#bokuDisplay').empty();
	checkedLine1 = false;
	checkedLine2 = false;
	checkedLine3 = false;
	checkedLine4 = false;

	var errorReport = $('<div/>');
	errorReport.addClass('error').html('<p>\'Oops! Check your words!\'</p>');

	$('#bokuDisplay').append(errorReport);
}

function updateBoku() {
	// clear old boku or error
	$('#bokuDisplay').empty();
	checkedLine1 = false;
	checkedLine2 = false;
	checkedLine3 = false;
	checkedLine4 = false;

	//make a new div for each line
	var line1D = $('<div/>');
	var line2D = $('<div/>');
	var line3D = $('<div/>');
	var line4D = $('<div/>');

	//add the id, class, and innerHTML attributes to the div
	line1D.attr('id', line1).addClass('bokuLine').html('<p>' + line1 + '</p>');
	line2D.attr('id', line2).addClass('bokuLine').html('<p>' + line2 + '</p>');
	line3D.attr('id', line3).addClass('bokuLine').html('<p>' + line3 + '</p>');
	line4D.attr('id', line4).addClass('bokuLine').html('<p>' + line4 + '</p>');

	$('#bokuDisplay').append(line1D);
	$('#bokuDisplay').append(line2D);
	$('#bokuDisplay').append(line3D);
	$('#bokuDisplay').append(line4D);
}
// counting number of words in a string input
function wordCount(str) { 
	return str.split(" ").length;
}
// check if number of words in each line is correct for a "Boku"
function checkBoku() {

	if(wordCount(line1) === 2) {
		console.log('Word Count Line 1: ' + wordCount(line1));
		checkedLine1 = true;
		console.log(checkedLine1);
	}
	if(wordCount(line2) === 4) {
		console.log('Word Count Line 2: ' + wordCount(line2));
		checkedLine2 = true;
		console.log(checkedLine2);
	}
	if(wordCount(line3) === 3) {
		console.log('Word Count Line 3: ' + wordCount(line3));
		checkedLine3 = true;
		console.log(checkedLine3);
	}
	if(wordCount(line4) === 2) {
		console.log('Word Count Line 4: ' + wordCount(line4));
		checkedLine4 = true;
		console.log(checkedLine4);
	}
	if(checkedLine1 == true && checkedLine2 == true && checkedLine3 == true && checkedLine4 == true) {
		updateBoku();
	} else {
		error();
	}
}
// get input lines
function saveBoku() {
	// save input lines
	line1 = $('#line1').val();
	line2 = $('#line2').val();
	line3 = $('#line3').val();
	line4 = $('#line4').val();

	//clear input fields
	$('#line1').val('');
	$('#line2').val('');
	$('#line3').val('');
	$('#line4').val('');

	checkBoku();
	stringArrays();
}

var init = function() {
	console.log('Initializing');
	//can also do just .click(function(e){ });
	$('#submit').on('click', function(e){
		e.preventDefault();
		saveBoku();
	});
};

//load listener
$(document).ready(init);