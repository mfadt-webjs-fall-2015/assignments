<?php
// Require the core Temboo PHP SDK and required libraries
require_once('php-sdk/src/temboo.php');

// Instantiate the session and Choreos
$session = new Temboo_Session('avamburke', 'myFirstApp', '1cd04d6877b34919af807dc42bb645e6');
$initializeOAuthChoreo = new Twitter_OAuth_InitializeOAuth($session);
$finalizeOAuthChoreo = new Twitter_OAuth_FinalizeOAuth($session);
$getFollowersByIDChoreo = new Twitter_FriendsAndFollowers_GetFollowersByID($session);
$getFriendsByIDChoreo = new Twitter_FriendsAndFollowers_GetFriendsByID($session);
$lookupChoreo = new Twitter_Users_Lookup($session);

// Act as a proxy on behalf of the JavaScript SDK
$tembooProxy = new Temboo_Proxy();

//++++Initialize OAuth Choreo++++
// Add Choreo proxy with an ID matching that specified by the JS SDK client
$tembooProxy->addChoreo('jsInitializeOAuth', $initializeOAuthChoreo);

// Set default input values
$tembooProxy->allowUserInputs('jsInitializeOAuth', 'ConsumerSecret')->allowUserInputs('jsInitializeOAuth', 'ConsumerKey');

//++++Finalize OAuth Choreo++++
// Add Choreo proxy with an ID matching that specified by the JS SDK client
$tembooProxy->addChoreo('jsFinalizeOAuth', $finalizeOAuthChoreo);

// Set default input values
$tembooProxy->allowUserInputs('jsFinalizeOAuth', 'CallbackID')->allowUserInputs('jsFinalizeOAuth', 'OAuthTokenSecret')->allowUserInputs('jsFinalizeOAuth', 'ConsumerSecret')->allowUserInputs('jsFinalizeOAuth', 'ConsumerKey');

//++++Twitter GetFollowersByID Choreo++++
// Add Choreo proxy with an ID matching that specified by the JS SDK client
$tembooProxy->addChoreo('jsGetFollowersByID', $getFollowersByIDChoreo);

// Set default input values
$tembooProxy->allowUserInputs('jsGetFollowersByID', 'ScreenName')->allowUserInputs('jsGetFollowersByID', 'AccessToken')->allowUserInputs('jsGetFollowersByID', 'AccessTokenSecret')->allowUserInputs('jsGetFollowersByID', 'ConsumerSecret')->allowUserInputs('jsGetFollowersByID', 'ConsumerKey');

//++++Twitter GetFriendsByID Choreo++++
// Add Choreo proxy with an ID matching that specified by the JS SDK client
$tembooProxy->addChoreo('jsGetFriendsByID', $getFriendsByIDChoreo);

// Set default input values
$tembooProxy->allowUserInputs('jsGetFriendsByID', 'ScreenName')->allowUserInputs('jsGetFriendsByID', 'AccessToken')->allowUserInputs('jsGetFriendsByID', 'AccessTokenSecret')->allowUserInputs('jsGetFriendsByID', 'ConsumerSecret')->allowUserInputs('jsGetFriendsByID', 'ConsumerKey');


//++++Twitter jsLookup Choreo++++
// Add Choreo proxy with an ID matching that specified by the JS SDK client
$tembooProxy->addChoreo('jsLookup', $lookupChoreo);

$tembooProxy->allowUserInputs('jsLookup', 'AccessToken')->allowUserInputs('jsLookup', 'AccessTokenSecret')->allowUserInputs('jsLookup', 'ConsumerSecret')->allowUserInputs('jsLookup', 'UserId')->allowUserInputs('jsLookup', 'ConsumerKey');


// Execute the Choreos
echo $tembooProxy->execute($_POST['temboo_proxy']);


?>