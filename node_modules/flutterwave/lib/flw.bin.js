
/**
*Flutterwave BIN class
*
* @class FlutterwaveBIN
* @constructor
*/ 

var FlutterwaveBIN = function (FlutterwaveBase) {

	/**
	* Get information about a card using the first 6 digits
	*
	* @method check
	* @param {String} card6
	* @param {Function} callback
	*/ 
	this.check = function (card6, callback) { 

		var requestParams      = {}; 
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams({card6:card6}, this.endpointParamSpec('/check'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST'; 
		return FlutterwaveBase.makeRequest('fw/check',  requestParams, callback);

	}

  
	this.endpointParamSpec = function (path)
	{
		var specs = {};
		specs['/check'] = FlutterwaveBase.objectBuilder({})
						     .build('card6', 'required:true, encrypt:false')  
						     .end();      

		return specs[path];
	} 

}

module.exports = FlutterwaveBIN;