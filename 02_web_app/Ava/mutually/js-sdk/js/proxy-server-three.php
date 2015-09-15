<?php
// Require the core Temboo PHP SDK and required libraries
require_once('php-sdk/src/temboo.php');

// Instantiate the session and Choreo
$session = new Temboo_Session('avamburke', 'myFirstApp', '1cd04d6877b34919af807dc42bb645e6');
$lookupChoreo = new Twitter_Users_Lookup($session);

// Act as a proxy on behalf of the JavaScript SDK
$tembooProxy = new Temboo_Proxy();

// Add Choreo proxy with an ID matching that specified by the JS SDK client
$tembooProxy->addChoreo('jsLookup', $lookupChoreo);

// Get an input object for the Choreo
$lookupInputs = $lookupChoreo->newInputs();

// Set credential to use for execution
$lookupInputs->setCredential('test');

$tembooProxy->setDefaultInputs('jsLookup', $lookupInputs);

// Set default input values
$tembooProxy->allowUserInputs('jsLookup', 'UserId');

// Execute the Choreo
echo $tembooProxy->execute($_POST['temboo_proxy']);
?>