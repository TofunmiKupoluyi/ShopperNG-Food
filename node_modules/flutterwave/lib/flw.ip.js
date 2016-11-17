
/**
* Flutterwave IP class
*
* @class FlutterwaveIP
* @constructor
*/ 

var FlutterwaveIP = function (FlutterwaveBase) {

	/**
	* Retrieves the information about a given IP address
	*
	* @method check
	* @param {String} ip
	* @param {Function} callback
	*/ 
	this.check = function (ip, callback) {

		FlutterwaveBase.paramCheck(ip, 'No ip argument passed');

		var requestParams      = {};
		requestParams.data     = {ip:ip};
		requestParams.method   = 'POST'; 

		return FlutterwaveBase.makeRequest('fw/ipcheck',  requestParams, callback);

	}

}


module.exports = FlutterwaveIP