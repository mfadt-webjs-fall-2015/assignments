/* Umi Syam
Assignment 1 - Word Count
Web Advanced Javascript - Fall 2015
 */

var app = app || {};
var frequency;

app.main = (function() {
	// console.log('Your code starts here!');

    function cleanString(string) {
        //more explanation & cool editor: https://regex101.com/
        return string.toLowerCase()
            .replace(/[^\w\s]|_/g, '') //match a single character not present in any word character [a-zA-Z0-9_] and also any white space character [\r\n\t\f ]
            .replace(/\s+/g, ' ');   //translate all the blank spaces
    }

    function extractWord(string, regex) {
        return cleanString(string).match(regex) || [];
    }

    function sortByFrequency(array) {
        frequency = [];
        // set all initial frequencies for each word to zero
        array.forEach(
            function(value) { frequency[value] = 0; }
        );
        // create new array with words and their frequencies
        var uniques = array.filter(
            function(value) { return ++frequency[value] == 1; }
        );
        
        return uniques.sort(function(a, b) { 
        	return frequency[b] - frequency[a]; 
        });

    };

    var startCounting = function() {
        var value = $('#text').val();
        
        //Match any non-white space character
        var regex = /\S+/gi;

        var eachWord = extractWord(value, regex);    
        var wordCount = eachWord.length;
        var allChars = value.length;
        var wordPlusPlusCount = value.replace(regex, '').length;

        var sorted = sortByFrequency(eachWord);
        // console.log(frequency);
        console.log(sorted);

        $('#wordCount').html(wordCount);
        $('#allChars').html(allChars);
        $('#wordPlusPlusCount').html(wordPlusPlusCount);

    };

    var displayOccurrence = function(){
    	$('#eachWord').html('');

        for (var key in frequency) {
            var objValue = frequency[key];
            // console.log(key + objValue);
            
            $('#eachWord').append('<li>' + key + ' <span class="numStyle">[' + objValue + ']</span> </li>');
        }
    };

	var init = function(){
		// console.log('Initializing app.');
		$('#countBtn').click(displayOccurrence);
        $('#text').change(startCounting);
        $('#text').keydown(startCounting);
        $('#text').keypress(startCounting);
        $('#text').keyup(startCounting);
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);
