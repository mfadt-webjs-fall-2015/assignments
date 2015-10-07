var app = app || {};

app.main = (function(){

    var followers = [];
    var following = [];
    var mutuals = [];


    // Instantiate the client proxies (No idea why, but it did NOT work when I tried to run both choreos
    //on the same proxy)
    var temboo = new TembooProxy('proxy-server.php');
    var tembooTwo = new TembooProxy('proxy-server-two.php');
    var tembooThree = new TembooProxy('proxy-server-three.php');

    // Add Choreos to their respective proxies
    var getFollowersByIDChoreo = temboo.addChoreo('jsGetFollowersByID');
    var getFriendsByIDChoreo = tembooTwo.addChoreo('jsGetFriendsByID');
    var lookupChoreo = tembooThree.addChoreo('jsLookup');

    // Add inputs
    getFollowersByIDChoreo.setInput('ScreenName', '@babyhorselegs');
    getFollowersByIDChoreo.setInput('AccessToken', '2962292470-T9k65U3i5mbYN9ijJNa9pd8lmgp7DJgSv6MVUex');
    getFollowersByIDChoreo.setInput('AccessTokenSecret', 'YHtZjyLkPN2E9N3GSuJoxQRaEXlBJ1HCyU7b4iv6UcoWt');
    getFollowersByIDChoreo.setInput('ConsumerSecret', 'PY0NDvs7FUe89JoXU4DKSO6SPjuOdgTPH8zh5u9eoLrZ1WsPnF');
    getFollowersByIDChoreo.setInput('ConsumerKey', 'waBR7wYsfqui5JTQJ0mz4f4AZ');
    getFriendsByIDChoreo.setInput('ScreenName', '@babyhorselegs');
    //lookupChoreo.setInput('UserId', '');

    var showResult = function(outputs) {
        var results = JSON.parse(outputs.Response);
        console.log(results);

        
        for (var i=0; i<results.length; i++) {
            var username = results[i].screen_name;
            var profile_pic = results[i].profile_image_url;
            var url = 'http://www.twitter.com/' + username;
            var bio = results[i].description;

            $('#pals').append('<div class="row pal-entry"><div class="col-xs-2 col-xs-offset-2 pic-wrapper"><img class="img-rounded" src="' + profile_pic + '"></div><div class="col-xs-7 "><a href="'+ url +'" target="_blank"><h2 class="text-left">@' + username +'</h2></a><p class="text-left">' + bio +'</p></div></div>');
            //console.log('mutual user object:' + usernames);
        };
    };

    var getUserInfo = function(mutuals) {
        //because the Lookup Choreo only accepts batches of 100 IDs or less, slice
        //the mutuals array into two batches if it is longer than 99 slots
        if (mutuals.length > 99) {
            var mutualsBatchOne = mutuals.slice(0, 98);
            var mutualsBatchTwo = mutuals.slice(99);
            console.log('batch one: ' + mutualsBatchOne);
            console.log('batch two: ' + mutualsBatchTwo);

            //stringify each batch into list of comma-separated values
            var mutualsBatchOneString = mutualsBatchOne.toString();
            var mutualsBatchTwoString = mutualsBatchTwo.toString();

            lookupChoreo.setInput('UserId', mutualsBatchOneString);
            lookupChoreo.execute(showResult, showError);

            lookupChoreo.setInput('UserId', mutualsBatchTwoString);
            lookupChoreo.execute(showResult, showError);


        } else {

            //stringify array of mutuals into list of comma-separated values
            var mutualsString = mutuals.toString();
            lookupChoreo.setInput('UserId', mutualsString);
            lookupChoreo.execute(showResult, showError);

            console.log('less than 99');
        }

        var palCount = mutuals.length;
        $('#submit').addClass('hide');
        $('#pal-count').append('<h2 class="center-block">*extremely congratulations voice* you\'ve got '+ palCount +' pals online!</h2>');

    };

    var checkMutual = function(followers, following) {

        //merge results into one giant array with duplicate entries
        var mergedResults = $.merge(followers, following);

        var counts = [];
        for (var i=0; i <= mergedResults.length; i++) {
            if(counts[mergedResults[i]] === undefined) {
                counts[mergedResults[i]] = 1;
            } else {
                mutuals.push(mergedResults[i]);
            }
        }


        console.log('mutuals: ' + mutuals);

        getUserInfo(mutuals);

        return mutuals;
        
    };

    // Success callbacks

    var showFollowing = function(outputs, outputFilters) {
        var results = JSON.parse(outputs.Response);
         // Get items array
        var followingData = results.ids;
        for(var i=0; i<followingData.length; i++) {
            following.push(followingData[i]);
            //console.log("following:"+following[i]);
        }

        checkMutual(followers, following);
        return following;
   
    };

    var showFollowers = function(outputs) {
        var results = JSON.parse(outputs.Response);
         // Get items array
        var followerData = results.ids;
        for(var j=0; j<followerData.length; j++){
            followers.push(followerData[j]);
        }
        //console.log("followers:"+followers);
        
        getFriendsByIDChoreo.execute(showFollowing, showError);

        return followers;

    };

    // var showFollowing = function(outputs, outputFilters) {
    //     var results = JSON.parse(outputs.Response);
    //      // Get items array
    //     var followingData = results.ids;
    //     for(var i=0; i<followingData.length; i++) {
    //         following.push(followingData[i]);
    //         console.log("following:"+following[i]);
    //     }
    //     return following;
    // };

    // Error callback
    var showError = function(error) {
        if(error.type === 'DisallowedInput') {
            console.log(error.type + ' error: ' + error.inputName);
        } else {
            console.log(error.type + ' error: ' + error.message);
        }
    };

    var loadData = function(username) {
        //getFollowersByIDChoreo.addOutputFilter('IDs', 'outputs/ids', 'IDs');
        // Run the Choreo, specifying success and error callback handlers
        getFollowersByIDChoreo.execute(showFollowers, showError);

        //getFriendsByIDChoreo.execute(showFollowing, showError);

        //checkMutual(followers, following);
    };

    //attach events:
    var attachEvents = function() {

        var getInput = function() {
            //send input of username box to loadData function
            loadData($('#username').val());
        };

        //call getInput whenever you press the button or hit enter
        $('#submit').on('click', getInput);
        $('#submit').keypress(function(e){
            if (e.keyCode == 13){
                getInput();
            };
        });
    };

    var init = function(){
        console.log('Initializing app.');
        //call the attachEvents function right away so all elements are interactive as soon as the DOM loads
        attachEvents();
    };

    return {
        init: init
    };
})();

/* Wait for all elements on the page to load */
window.addEventListener('DOMContentLoaded', app.main.init);
