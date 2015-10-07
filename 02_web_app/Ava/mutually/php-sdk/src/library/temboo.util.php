<?php

/**
 * Temboo PHP SDK Util classes
 *
 * Execute Choreographies from the Temboo Util bundle.
 *
 * PHP version 5
 *
 * LICENSE: Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @category   Services
 * @package    Temboo
 * @subpackage Util
 * @author     Temboo, Inc.
 * @copyright  2013 Temboo, Inc.
 * @license    http://www.apache.org/licenses/LICENSE-2.0 Apache License 2.0
 * @link       http://www.temboo.com
 */
/**
 * Creates a new label.
 *
 * @package Temboo
 * @subpackage Util
 */
class Util_StreamSensorData extends Temboo_Choreography
{
    /**
     * Creates a new label.
     *
     * @param Temboo_Session $session The session that owns this StreamSensorData Choreo.
     * @return Util_StreamSensorData New instance.
     */
    public function __construct(Temboo_Session $session)
    {
        parent::__construct($session, '/Library/Util/StreamSensorData/');
    }

    /**
     * Executes this Choreo.
     *
     * Execution object provides access to results appropriate for this StreamSensorData Choreo.
     *
     * @param Util_StreamSensorData_Inputs|array $inputs (optional) Inputs as Util_StreamSensorData_Inputs or associative array.
     * @param bool $async Whether to execute in asynchronous mode. Default false.
     * @param bool $store_results Whether to store results of asynchronous execution. Default true.
     * @return Util_StreamSensorData_Execution New execution object.
     * @throws Temboo_Exception_Authentication if session authentication fails.
     * @throws Temboo_Exception_Execution if runtime errors occur in synchronous execution or execution fails to start. NOT thrown for post-launch errors in asynchronous execution -- check status or results to determine asynchronous success.
     * @throws Temboo_Exception_Notfound if choreography does not exist.
     * @throws Temboo_Exception if execution request fails.
     */
    public function execute($inputs = array(), $async = false, $store_results = true)
    {
        return new Util_StreamSensorData_Execution($this->session, $this, $inputs, $async, $store_results);
    }

    /**
     * Obtains a new inputs object.
     *
     * Includes setters appropriate for this StreamSensorData Choreo.
     *
     * @param array $inputs (optional) Associative array of input names and values.
     * @return Util_StreamSensorData_Inputs New inputs object.
     * @throws Temboo_Exception if provided input set is invalid. (Note an empty set is considered valid.)
     */
    public function newInputs($inputs = array())
    {
        return new Util_StreamSensorData_Inputs($inputs);
    }
}


/**
 * Inputs object with appropriate setters for the StreamSensorData Choreo.
 *
 * @package Temboo
 * @subpackage Util
 */
class Util_StreamSensorData_Inputs extends Temboo_Inputs
{
   /**
     * Inputs object with appropriate setters for the StreamSensorData Choreo.
     *
     * @param array $inputs (optional) Associative array of input names and values.
     * @return Util_StreamSensorData_Inputs New instance.
     * @throws Temboo_Exception if provided input set is invalid. (Note an empty set is considered valid.)
     */
    public function __construct($inputs = array())
    {
        parent::__construct($inputs);
    }

    /**
     * Set arbitrary input this StreamSensorData input set.
     *
     * Input names are case sensitive.
     *
     * @param string $name Input name.
     * @param string $value Input value.
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function set($name, $value)
    {
        return parent::set($name, $value);
    }

    /**
     * Set credential
     *
     * @param string $credentialName The name of a credential in your account specifying presets for this set of inputs.
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function setCredential($credentialName)
    {
        return parent::setCredential($credentialName);
    }

    /**
     * Set the value for the Async input for this StreamSensorData Choreo.
     *
     * @param bool $value (optional, boolean) When set to "true" the request to the data service happens asyncronously. Set to "false" if you want the Choreo to wait for the execution to complete and return API's response.
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function setAsync($value)
    {
        return $this->set('Async', $value);
    }

    /**
     * Set the value for the ClientID input for this StreamSensorData Choreo.
     *
     * @param string $value (conditional, string) The Client ID provided by the data service.
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function setClientID($value)
    {
        return $this->set('ClientID', $value);
    }

    /**
     * Set the value for the ClientSecret input for this StreamSensorData Choreo.
     *
     * @param string $value (conditional, string) The Client Secret provided by the data service.
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function setClientSecret($value)
    {
        return $this->set('ClientSecret', $value);
    }

    /**
     * Set the value for the DatasetID input for this StreamSensorData Choreo.
     *
     * @param string $value (required, string) The ID of the dataset that your table belongs to.
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function setDatasetID($value)
    {
        return $this->set('DatasetID', $value);
    }

    /**
     * Set the value for the ProjectID input for this StreamSensorData Choreo.
     *
     * @param string $value (required, string) The ID of your Google API project.
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function setProjectID($value)
    {
        return $this->set('ProjectID', $value);
    }

    /**
     * Set the value for the RefreshToken input for this StreamSensorData Choreo.
     *
     * @param string $value (conditional, string) An OAuth Refresh Token used to generate a new Access Token when the original token is expired.
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function setRefreshToken($value)
    {
        return $this->set('RefreshToken', $value);
    }

    /**
     * Set the value for the SensorData input for this StreamSensorData Choreo.
     *
     * @param string $value (required, json) A JSON object containing key/value pairs.
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function setSensorData($value)
    {
        return $this->set('SensorData', $value);
    }

    /**
     * Set the value for the Service input for this StreamSensorData Choreo.
     *
     * @param string $value (required, string) Indicates the service to stream to. Valid values are: BigQuery or Power BI
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function setService($value)
    {
        return $this->set('Service', $value);
    }

    /**
     * Set the value for the TableID input for this StreamSensorData Choreo.
     *
     * @param string $value (required, string) The ID (or name) of the table to insert a row into.
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function setTableID($value)
    {
        return $this->set('TableID', $value);
    }

    /**
     * Set the value for the TimestampColumn input for this StreamSensorData Choreo.
     *
     * @param string $value (optional, string) The name of the column that that the choreo will auto-generate a timestamp for.
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function setTimestampColumn($value)
    {
        return $this->set('TimestampColumn', $value);
    }

    /**
     * Set the value for the TimestampFormat input for this StreamSensorData Choreo.
     *
     * @param string $value (optional, string) The format of the auto generated timestamp (e.g. yyyy-MM-dd HH:mm:ss.SSS). If set to "milliseconds" or "seconds", the timestamp will be an epoch date.
     * @return Util_StreamSensorData_Inputs For method chaining.
     */
    public function setTimestampFormat($value)
    {
        return $this->set('TimestampFormat', $value);
    }
}


/**
 * Execution object for the StreamSensorData Choreo.
 *
 * @package Temboo
 * @subpackage Util
 */
class Util_StreamSensorData_Execution extends Temboo_Choreography_Execution
{
    /**
     * Execution object for the StreamSensorData Choreo.
     *
     * @param Temboo_Session $session The session that owns this StreamSensorData execution.
     * @param Util_StreamSensorData $choreo The choreography object for this execution.
     * @param Util_StreamSensorData_Inputs|array $inputs (optional) Inputs as Util_StreamSensorData_Inputs or associative array.
     * @param bool $async Whether to execute in asynchronous mode. Default false.
     * @param bool $store_results Whether to store results of asynchronous execution. Default true.
     * @return Util_StreamSensorData_Execution New execution.
     * @throws Temboo_Exception_Authentication if session authentication fails.
     * @throws Temboo_Exception_Execution if runtime errors occur in synchronous execution or execution fails to start. NOT thrown for post-launch errors in asynchronous execution -- check status or results to determine asynchronous success.
     * @throws Temboo_Exception_Notfound if choreography does not exist.
     */
    public function __construct(Temboo_Session $session, Util_StreamSensorData $choreo, $inputs = array(), $async = false, $store_results = true)
    {
        parent::__construct($session, $choreo, $inputs, $async, $store_results);
    }

    /**
     * Obtains a new results object.
     *
     * Includes getters appropriate for this StreamSensorData execution.
     *
     * @return Util_StreamSensorData_Results New results object.
     * @throws Temboo_Exception_Authentication if session authentication fails.
     * @throws Temboo_Exception_Execution if runtime errors occurred in asynchronous execution.
     * @throws Temboo_Exception_Notfound if execution does not exist.
     * @throws Temboo_Exception if result request fails.
     */
    public function getResults()
    {
        return parent::getResults();
    }

    /**
     * Wraps results in appropriate results class for this StreamSensorData execution.
     *
     * @param array $outputs Associative array of output names and values.
     * @return Util_StreamSensorData_Results New results object.
     */
    protected function wrapResults($outputs)
    {
        return new Util_StreamSensorData_Results($outputs);
    }
}


/**
 * Results object with appropriate getters for the StreamSensorData Choreo.
 *
 * @package Temboo
 * @subpackage Util
 */
class Util_StreamSensorData_Results extends Temboo_Results
{
    /**
     * Results object with appropriate getters for the StreamSensorData Choreo.
     *
     * @param array $outputs (optional) Associative array of output names and values.
     * @return Util_StreamSensorData_Results New instance.
     * @throws Temboo_Exception if provided output set is invalid. (Note an empty set is considered valid.)
     */
    public function __construct($outputs = array())
    {
        parent::__construct($outputs);
    }
    /**
     * Retrieve the value for the "Response" output from this StreamSensorData execution.
     *
     * @return string (json) Contains the response from Google when using the Async=fase option.
     * @throws Temboo_Exception_Notfound if output does not exist. (Note an empty response is considered valid.)
     */
    public function getResponse()
    {
        return $this->get('Response');
    }
    /**
     * Retrieve the value for the "ResponseStatusCode" output from this StreamSensorData execution.
     *
     * @return int (integer) The response status code from the API.
     * @throws Temboo_Exception_Notfound if output does not exist. (Note an empty response is considered valid.)
     */
    public function getResponseStatusCode()
    {
        return $this->get('ResponseStatusCode');
    }
}

?>