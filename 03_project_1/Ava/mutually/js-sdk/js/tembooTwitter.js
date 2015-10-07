var app = app || {};

app.main = (function(){

    var followers = [];
    var following = [];
    var mutuals = [];

    //storing tokens and secrets and such in variables
    //placeholders for accessToken and accessTokenSecret (will change during OAuth)
    // var accessToken = '2962292470-T9k65U3i5mbYN9ijJNa9pd8lmgp7DJgSv6MVUex';
    // var accessTokenSecret = 'YHtZjyLkPN2E9N3GSuJoxQRaEXlBJ1HCyU7b4iv6UcoWt';
    var consumerSecret = 'TUf4ActzcM2ya6Op1wJ4bVIC68n3IinRwx7HxwDunbzne2dThU';
    var consumerKey = '7JmTwnZ9FAt5mfK62PRzqVYTd';
    var username = '';

    // Instantiate the client proxy
    var temboo = new TembooProxy('proxy-server.php');

    // Add Choreos to the proxy
    var initializeOAuthChoreo = temboo.addChoreo('jsInitializeOAuth');
    var finalizeOAuthChoreo = temboo.addChoreo('jsFinalizeOAuth');
    var getFollowersByIDChoreo = temboo.addChoreo('jsGetFollowersByID');
    var getFriendsByIDChoreo = temboo.addChoreo('jsGetFriendsByID');
    var lookupChoreo = temboo.addChoreo('jsLookup');

    //lookupChoreo.setInput('UserId', '');

    //go ahead and set inputs that are static:
    initializeOAuthChoreo.setInput('ConsumerSecret', consumerSecret);
    initializeOAuthChoreo.setInput('ConsumerKey', consumerKey);
    finalizeOAuthChoreo.setInput('ConsumerSecret', consumerSecret);
    finalizeOAuthChoreo.setInput('ConsumerKey', consumerKey);
    getFollowersByIDChoreo.setInput('ConsumerSecret', consumerSecret);
    getFollowersByIDChoreo.setInput('ConsumerKey', consumerKey);
    getFriendsByIDChoreo.setInput('ConsumerSecret', consumerSecret);
    getFriendsByIDChoreo.setInput('ConsumerKey', consumerKey);
    lookupChoreo.setInput('ConsumerSecret', consumerSecret);
    lookupChoreo.setInput('ConsumerKey', consumerKey);
    

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
        console.log('byeee!');
        var results = JSON.parse(outputs.Response);
         // Get items array
        var followingData = results.ids;
        for(var i=0; i<followingData.length; i++) {
            //push to following array:
            following.push(followingData[i]);
        }

        //call checkMutual function, passing in both followers and following arrays:
        checkMutual(followers, following);
        return following;
   
    };

    var showFollowers = function(outputs) {
        console.log('hi!');
        var results = JSON.parse(outputs.Response);
         // Get items array
        var followerData = results.ids;
        for(var j=0; j<followerData.length; j++){
            //push to followers array:
            followers.push(followerData[j]);
        }

        //console.log("followers:"+followers);

        //execute getFriendsByID choreo
        getFriendsByIDChoreo.execute(showFollowing, showError);

        return followers;

    };

    //success callback for Finalize OAuth choreo
    var oAuthFinalResult = function(outputs) {
        // for(var name in outputs) {
        //     console.log('Final OAuth outputs:' + name + ': ' + outputs[name]);
        // }

        console.log('hello');

        //grab the username that was authorized
        username = outputs.ScreenName;
        //split it because the string returned from the choreo always gives you some weird characters after the username
        username = username.substr(0, username.indexOf('&'));

        $('#tagline').addClass('hide');
        $('#submit').addClass('hide');
        $('#input').append('<div id="username" class="col-sm-12 big-text">@'+ username +'</div>');
        
        //grab the access token and secret uniquely generated for these OAuth credentials
        var accessToken = outputs.AccessToken;
        var accessTokenSecret = outputs.AccessTokenSecret;

        console.log('access token: ' + accessToken + ' access token secret: ' + accessTokenSecret);

        //set the inputs for getFollowersByID choreo, getFriendsByID choreo, and lookup choreo based on the user that has been
        //authorized in this session:
        getFollowersByIDChoreo.setInput('ScreenName', username);
        getFollowersByIDChoreo.setInput('AccessToken', accessToken);
        getFollowersByIDChoreo.setInput('AccessTokenSecret', accessTokenSecret);
        getFriendsByIDChoreo.setInput('ScreenName', username);
        getFriendsByIDChoreo.setInput('AccessToken', accessToken);
        getFriendsByIDChoreo.setInput('AccessTokenSecret', accessTokenSecret);
        lookupChoreo.setInput('AccessToken', accessToken);
        lookupChoreo.setInput('AccessTokenSecret', accessTokenSecret);

        //execute the getFollowersByID choreo
        getFollowersByIDChoreo.execute(showFollowers, showError);

    };

    //success callback for Init OAuth choreo
    var oAuthInitResult = function(outputs) {
        //console.log(outputs);

        var _callbackID = outputs.CallbackID;
        var _authURL = outputs.AuthorizationURL;
        var _tokenSecret = outputs.OAuthTokenSecret;
       
       //set inputs for Finalize OAuth choreo
        finalizeOAuthChoreo.setInput('CallbackID', _callbackID);
        finalizeOAuthChoreo.setInput('OAuthTokenSecret', _tokenSecret);

        //open a new window for the user to log in to twitter and/or authorize the app to use their account details
        var authWindow = window.open(_authURL, 'height=500,width=500');

        setTimeout(function(){
            authWindow.close();
        },10000);

        //execute Finalize OAuth choreo
        finalizeOAuthChoreo.execute(oAuthFinalResult, showError);

    };

    // Error callback for all Temboo functions
    var showError = function(error) {
        if(error.type === 'DisallowedInput') {
            console.log(error.type + ' error: ' + error.inputName);
        } else {
            console.log(error.type + ' error: ' + error.message);
        }
    };

    var getInput = function() {
        initializeOAuthChoreo.execute(oAuthInitResult, showError);
    };

    //attach events:
    var attachEvents = function() {
        //call getInput whenever you press the button or hit enter
        $('#submit').off('click').on('click', getInput);

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
