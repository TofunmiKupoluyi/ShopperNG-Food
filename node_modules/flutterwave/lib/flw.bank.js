
/**
* Flutterwave IP class
*
* @class FlutterwaveIP
* @constructor
*/ 

var FlutterwaveBANK = function (FlutterwaveBase) {

	/**
	* Retrieves a list of Banks
	*
	* @method check 
	* @param {Function} callback
	*/ 
	this.getBanks = function (callback) { 

		var requestParams      = {};
		requestParams.data     = {};
		requestParams.method   = 'POST'; 

		return FlutterwaveBase.makeRequest('fw/banks',  requestParams, callback);

	}

}


module.exports = FlutterwaveBANK