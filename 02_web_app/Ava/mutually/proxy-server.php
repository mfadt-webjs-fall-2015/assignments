<?php
// Require the core Temboo PHP SDK and required libraries
require_once('php-sdk/src/temboo.php');

// Instantiate the session and Choreo
$session = new Temboo_Session('avamburke', 'myFirstApp', '1cd04d6877b34919af807dc42bb645e6');
$getFollowersByIDChoreo = new Twitter_FriendsAndFollowers_GetFollowersByID($session);

// Act as a proxy on behalf of the JavaScript SDK
$tembooProxy = new Temboo_Proxy();

// Add Choreo proxy with an ID matching that specified by the JS SDK client
$tembooProxy->addChoreo('jsGetFollowersByID', $getFollowersByIDChoreo);

// Set default input values
$tembooProxy->allowUserInputs('jsGetFollowersByID', 'ScreenName')->allowUserInputs('jsGetFollowersByID', 'AccessToken')->allowUserInputs('jsGetFollowersByID', 'AccessTokenSecret')->allowUserInputs('jsGetFollowersByID', 'ConsumerSecret')->allowUserInputs('jsGetFollowersByID', 'ConsumerKey');

// Execute the Choreo
echo $tembooProxy->execute($_POST['temboo_proxy']);


?>