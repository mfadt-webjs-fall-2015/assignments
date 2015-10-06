
// Define the string
$(document).ready(function(){
	$("#myBt").click(function(e){

		// var input = function(){};
		var string = $('#inputForm').val();
		// console.log(string);
		// console.log('1');
		// Encode the String
		var encodedString = btoa(string);
		console.log(encodedString); // Outputs: "SGVsbG8gV29ybGQh"
     });

    $("#myBt2").click(function(e){
        var string = $('#inputForm2').val();
		// Decode the String
		var decodedString = atob(string);
		console.log(decodedString); // Outputs: "Hello World!"
    });
});
