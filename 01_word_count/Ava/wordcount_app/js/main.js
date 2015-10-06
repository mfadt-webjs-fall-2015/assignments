// /* Your code starts here */

/* Your code starts here */
//place to store stories
var newStory;

//place to store words themselves
var words = [];
//word count array
var counts = [];

//calculating how many times each individual word is used in the stories that have been submitted
function calculateFrequency(result) {
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
		if(words[i] !== undefined) {
	    	var newWord = words[i] + ': ' + counts[i];
	    	var wordListing = $('<div/>');
	    	wordListing.addClass('wordList');
	    	wordListing.html('<h2>' + newWord + '</h2>');
	    	$('#wordCount').append(wordListing);
    	} 
    	console.log(words[i] + ': ' + counts[i]);
	}
};

//generic word count function to determine if the story someone is trying to submit is actually 7 words
function wordCount(str) {
	//inititalize # of words at 0
	var count = 0;
	//iterate through length of string -1
	for(var i=0; i<str.length-1; i++) {
		//count each time the character is a space
		if(str.charAt(i)==' ') {
			count ++;
		}
	}
	//update word count
	return count + 1;
};

//turn string into separate words in words array
function stringArrays() {
	//split each word into a separate element of the words array
	var words = newStory.split(' ');
	//merge into existing words array
	$.merge(newStory, words);

	//add event listener
	var wordCountButton = document.getElementById('wordCountButton');
		wordCountButton.addEventListener('click', function(e){
			e.preventDefault();
			calculateFrequency(words);
		});
};

//update stories
var updateStories = function() {
	//empty published stories div
	$('#publishedStories').empty();
	//create new div for new story
	var storyListing = $('<div/>');

	storyListing.html('<h2>' + newStory + '</h2>');
	//append to parent div
	$('#publishedStories').append(storyListing);

};

//save a new story
var saveStory = function() {

	//define input and value of input
	var storyInput = document.getElementById('storyInput');
	newStory = storyInput.value;

	//check to see if what someone is submitting is actually 7 words
	var isSeven = wordCount(newStory);
 	//if it is seven words...
	if (isSeven == 7) {

		newStory = $('#storyInput').val();

		$('#storyInput').val('');

		updateStories();
		stringArrays();
	//if it isn't seven words...
	} else {
		console.log('error! not seven');
		var errorMessage = document.getElementById('errorMessage');
		errorMessage.innerText = 'Your story isn\'t seven words long. Please try again.';
	}
};

var init = function() {
	console.log('ready!');
	//define submit button
	var submitButton = document.getElementById('submit');

	//add event listener for what to do when someone clicks the submit button
	submitButton.addEventListener('click', function(e){
		e.preventDefault();
		//calls save story function when the button is clicked
		saveStory();
	});
};

window.onload = init();