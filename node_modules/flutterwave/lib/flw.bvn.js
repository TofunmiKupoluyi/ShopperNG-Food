/**
* Flutterwave BVN class
*
* @class FlutterwaveBVN
* @constructor
*/ 
var FlutterwaveBVN = function (FlutterwaveBase) {


	/**
	* Verifies a given BVN number
	*
	* @method verify
	* @param {String} otpoption one of SMS or Voice 
	* @param {String} bvn The BVN to verify
	* @param {Function} Response callback
	*/ 
	this.verify = function (otpoption, bvn, callback)
	{

		 

		var requestData = {};
		requestData.bvn = bvn;
		requestData.otpoption  = otpoption;
		requestData.merchantid = FlutterwaveBase.getMerchantKey(); 

		var merchantAPIKey = FlutterwaveBase.getMerchantAPIKey();
		requestData = FlutterwaveBase.validateAndEncryptParams(requestData, this.endpointParamSpec('/verify'), FlutterwaveBase.getMerchantAPIKey());

		var requestParams    = {};
		requestParams.data   = requestData;
		requestParams.method = "POST";
		return FlutterwaveBase.makeRequest('bvn/verify',  requestParams, callback);


	}


	/**
	* Validates a given BVN against a transaction
	*
	* @method validate
	* @param {String} otp
	* @param {String} bvn The BVN to verify
	* @param {String} transactionreference The BVN to verify
	* @param {Function} Response callback
	*/
	this.validate = function (otp, bvn, transactionreference, callback) 
	{
 
		 

		var requestData = {};
		requestData.bvn = bvn;
		requestData.otp  = otp;
		requestData.transactionreference = transactionreference;
		requestData.merchantid = FlutterwaveBase.getMerchantKey(); 
 
		requestData = FlutterwaveBase.validateAndEncryptParams(requestData, this.endpointParamSpec('/validate'), FlutterwaveBase.getMerchantAPIKey());

		var requestParams    = {};
		requestParams.data   = requestData;
		requestParams.method = "POST";
		return FlutterwaveBase.makeRequest('bvn/validate',  requestParams, callback);

	} 


	/**
	* Resend OTP
	*
	* @method resendOTP
	* @param {String} otpoption one of SMS or Voice 
	* @param {String} bvn The BVN to verify
	* @param {Function} Response callback
	*/ 
	this.resendOTP = function (validateoption, transactionreference, callback)
	{

		var requestData = {};
		requestData.validateoption = validateoption;
		requestData.transactionreference  = transactionreference;
		requestData.merchantid = FlutterwaveBase.getMerchantKey(); 
 
		requestData = FlutterwaveBase.validateAndEncryptParams(requestData, this.endpointParamSpec('/resendotp'), FlutterwaveBase.getMerchantAPIKey());

		var requestParams    = {};
		requestParams.data   = requestData;
		requestParams.method = "POST";
		return FlutterwaveBase.makeRequest('bvn/resendotp',  requestParams, callback);


	}


	this.endpointParamSpec = function (path)
	{
		var specs = {};
		specs['/verify'] = FlutterwaveBase.objectBuilder({})
						   .build('otpoption', 'required:true, encrypt:true')
						   .build('merchantid', 'required:true, encrypt:false')
						   .build('bvn', 'required:true, encrypt:true')
						   .end();


		specs['/validate'] = FlutterwaveBase.objectBuilder({})
						     .build('otp', 'required:true, encrypt:true')
						     .build('merchantid', 'required:true, encrypt:false')
						     .build('transactionreference', 'required:true, encrypt:true')
						     .build('bvn', 'required:true, encrypt:true')
						     .end();

		specs['/resendotp'] = FlutterwaveBase.objectBuilder({})
						   .build('validateoption', 'required:true, encrypt:true')
						   .build('merchantid', 'required:true, encrypt:false')
						   .build('transactionreference', 'required:true, encrypt:true')
						   .end();

		return specs[path];
	}
}

module.exports = FlutterwaveBVN;