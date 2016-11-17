
/**
* Flutterwave Card class
*
* @class FlutterwaveCard
* @constructor
*/ 

var FlutterwaveCard = function (FlutterwaveBase) {

	/**
	* Charge a card
	*
	* @method pay
	* @param {Object} paymentData {amount, authmodel, cardno, currency, country, custid, cvv, [cardtype], expirymonth, expiryyear, merchantid, narration, [responseurl], [bvn], [pin] }
	* @param {Function} callback
	*/ 
	this.charge = function (paymentData, callback) { 

		var requestParams      = {};
		paymentData.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(paymentData, this.endpointParamSpec('/mvva/pay'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST'; 
		return FlutterwaveBase.makeRequest('card/mvva/pay',  requestParams, callback);

	}

	/**
	* Charge a card using a token
	*
	* @method pay
	* @param {Object} paymentData {amount, currency, custid, narration, chargetoken, [cardtype]}
	* @param {Function} callback
	*/ 
	this.chargeWithToken = function (paymentData, callback) { 

		var requestParams      = {};
		paymentData.merchantid = FlutterwaveBase.getMerchantKey();
		requestParams.data     = FlutterwaveBase.validateAndEncryptParams(paymentData, this.endpointParamSpec('/mvva/payT'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method   = 'POST'; 
		return FlutterwaveBase.makeRequest('card/mvva/pay',  requestParams, callback);

	}

	/**
	* Tokenize a card
	*
	* @method tokenize
	* @param {Object} cardData {validateoption, authmodel, cardno, cvv, expirymonth, expiryyear, merchantid, bvn}
	* @param {Function} callback
	*/ 
	this.tokenize = function (cardData, callback) {

		var requestParams    = {};
		cardData.merchantid  = FlutterwaveBase.getMerchantKey();
		requestParams.data   = FlutterwaveBase.validateAndEncryptParams(cardData, this.endpointParamSpec('/mvva/tokenize'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method = 'POST';
		return FlutterwaveBase.makeRequest('card/mvva/tokenize', requestParams, callback);
	}


	/**
	* Validate a card
	*
	* @method validate
	* @param {Object} cardData {otp, otptransactionidentifier, merchantid, [cardtype]}
	* @param {Function} callback
	*/ 
	this.validate = function (cardData, callback) {

		var requestParams    = {};
		cardData.merchantid  = FlutterwaveBase.getMerchantKey();
		requestParams.data   = FlutterwaveBase.validateAndEncryptParams(cardData, this.endpointParamSpec('/mvva/validate'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method = 'POST';
		return FlutterwaveBase.makeRequest('card/mvva/pay/validate', requestParams, callback);
	}

	/**
	* Preauth a card transaction
	*
	* @method validate
	* @param {Object} cardData {amount, currency, merchantid, chargetoken}
	* @param {Function} callback
	*/ 
	this.preauth = function (cardData, callback) {

		var requestParams    = {};
		cardData.merchantid  = FlutterwaveBase.getMerchantKey();
		requestParams.data   = FlutterwaveBase.validateAndEncryptParams(cardData, this.endpointParamSpec('/mvva/preauth'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method = 'POST';
		return FlutterwaveBase.makeRequest('card/mvva/preauthorize', requestParams, callback);
	}


	/**
	* Capture
	*
	* @method validate
	* @param {Object} cardData {amount, currency, merchants, trxreference, trxauthorizeid}
	* @param {Function} callback
	*/ 
	this.capture = function (cardData, callback) {

		var requestParams    = {};
		cardData.merchantid  = FlutterwaveBase.getMerchantKey();
		requestParams.data   = FlutterwaveBase.validateAndEncryptParams(cardData, this.endpointParamSpec('/mvva/capture'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method = 'POST';
		return FlutterwaveBase.makeRequest('card/mvva/capture', requestParams, callback);
	}


	/**
	* Refund amount captured or paid
	*
	* @method validate
	* @param {Object} cardData {amount, currency, merchants, trxreference, trxauthorizeid}
	* @param {Function} callback
	*/ 
	this.refund = function (cardData, callback) {

		var requestParams    = {};
		cardData.merchantid  = FlutterwaveBase.getMerchantKey();
		requestParams.data   = FlutterwaveBase.validateAndEncryptParams(cardData, this.endpointParamSpec('/mvva/refund'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method = 'POST';
		return FlutterwaveBase.makeRequest('card/mvva/refund', requestParams, callback);
	}


	/**
	* Void a transaction
	*
	* @method validate
	* @param {Object} cardData {amount, currency, merchants, trxreference, trxauthorizeid}
	* @param {Function} callback
	*/ 
	this.void = function (cardData, callback) {

		var requestParams    = {};
		cardData.merchantid  = FlutterwaveBase.getMerchantKey();
		requestParams.data   = FlutterwaveBase.validateAndEncryptParams(cardData, this.endpointParamSpec('/mvva/void'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method = 'POST';
		return FlutterwaveBase.makeRequest('card/mvva/void', requestParams, callback);
	}


	/**
	* Get information about a card
	*
	* @method enquiry
	* @param {Object} cardData {amount, currency, merchants, trxreference, trxauthorizeid}
	* @param {Function} callback
	*/ 
	this.enquiry = function (cardData, callback) {

		var requestParams    = {};
		cardData.merchantid  = FlutterwaveBase.getMerchantKey();
		requestParams.data   = FlutterwaveBase.validateAndEncryptParams(cardData, this.endpointParamSpec('/mvva/cardenquiry'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method = 'POST';
		return FlutterwaveBase.makeRequest('card/mvva/cardenquiry', requestParams, callback);
	}



	/**
	* Validates enquiry info
	*
	* @method enquiry
	* @param {Object} cardData {amount, currency, merchants, trxreference, trxauthorizeid}
	* @param {Function} callback
	*/ 
	this.validateEnquiry = function (cardData, callback) {

		var requestParams    = {};
		cardData.merchantid  = FlutterwaveBase.getMerchantKey();
		requestParams.data   = FlutterwaveBase.validateAndEncryptParams(cardData, this.endpointParamSpec('/cardenquiry/validate'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method = 'POST';
		return FlutterwaveBase.makeRequest('card/mvva/cardenquiry/validate', requestParams, callback);
	}


	/**
	* Withdraw
	*
	* @method enquiry
	* @param {Object} cardData {amount, accountno, validateoption, merchant, trxreference}
	* @param {Function} callback
	*/ 
	this.withdraw = function (cardData, callback) {

		var requestParams    = {};
		cardData.merchantid  = FlutterwaveBase.getMerchantKey();
		requestParams.data   = FlutterwaveBase.validateAndEncryptParams(cardData, this.endpointParamSpec('/card/withdraw'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method = 'POST';
		return FlutterwaveBase.makeRequest('card/mvva/withdraw/', requestParams, callback);
	}


	/**
	* Verify the status of a transaction
	*
	* @method status
	* @param {Object} trxreference
	* @param {Function} callback
	*/ 
	this.status = function (trxreference, callback) {

		var requestParams     = {};
		var cardData          = {};
		cardData.trxreference = trxreference;
		cardData.merchantid   = FlutterwaveBase.getMerchantKey();
		requestParams.data    = FlutterwaveBase.validateAndEncryptParams(cardData, this.endpointParamSpec('/mvva/status'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method  = 'POST';
		return FlutterwaveBase.makeRequest('card/mvva/status', requestParams, callback);
	}
 
	this.endpointParamSpec = function (path)
	{
		var specs = {};
		specs['/mvva/pay']   = FlutterwaveBase.objectBuilder({})
						     .build('amount', 'required:true, encrypt:true')
						     .build('authmodel', 'required:true, encrypt:true')
						     .build('cardno', 'required:true, encrypt:true')
						     .build('currency', 'required:true, encrypt:true')
						     .build('custid', 'required:true, encrypt:true')
						     .build('cvv', 'required:true, encrypt:true')
						     .build('cardtype', 'required:false, encrypt:true')
						     .build('expirymonth', 'required:true, encrypt:true')
						     .build('country', 'required:false, encrypt:true')
						     .build('expiryyear', 'required:true, encrypt:true')
						     .build('merchantid', 'required:true, encrypt:false')
						     .build('narration', 'required:true, encrypt:true')
						     .build('responseurl', 'required:false, encrypt:true')
						     .build('bvn', 'required:false, encrypt:true')
						     .build('pin', 'required:false, encrypt:true')
						     .end(); 

		specs['/mvva/payT']   = FlutterwaveBase.objectBuilder({})
						     .build('amount', 'required:true, encrypt:true') 
						     .build('narration', 'required:true, encrypt:true')
						     .build('currency', 'required:true, encrypt:true')
						     .build('custid', 'required:true, encrypt:true') 
						     .build('cardtype', 'required:false, encrypt:true')  
						     .build('country', 'required:false, encrypt:true')  
						     .build('chargetoken', 'required:true, encrypt:true')
						     .build('merchantid', 'required:true, encrypt:false')
						     .end();

 

		specs['/card/withdraw']   = FlutterwaveBase.objectBuilder({})
						     .build('amount', 'required:true, encrypt:true') 
						     .build('accountno', 'required:true, encrypt:true')
						     .build('validateoption', 'required:true, encrypt:true')   
						     .build('trxreference', 'required:true, encrypt:true')  
						     .build('merchantid', 'required:true, encrypt:false')
						     .end(); 


	 
		specs['/mvva/cardenquiry']   = FlutterwaveBase.objectBuilder({})
						     .build('pin', 'required:true, encrypt:true') 
						     .build('expirymonth', 'required:true, encrypt:true')
						     .build('expiryyear', 'required:true, encrypt:true')
						     .build('cvv', 'required:true, encrypt:true') 
						     .build('cardno', 'required:false, encrypt:true')  
						     .build('trxreference', 'required:false, encrypt:true')  
						     .build('merchantid', 'required:true, encrypt:false')
						     .end(); 


		specs['/cardenquiry/validate']   = FlutterwaveBase.objectBuilder({})
						     .build('otp', 'required:true, encrypt:true') 
						     .build('otptransactionidentifier', 'required:true, encrypt:true')  
						     .build('trxreference', 'required:false, encrypt:true')  
						     .build('merchantid', 'required:true, encrypt:false')
						     .end(); 


		specs['/mvva/tokenize'] = FlutterwaveBase.objectBuilder({})
						     .build('validateoption', 'required:true, encrypt:true')
						     .build('authmodel', 'required:true, encrypt:true')
						     .build('cardno', 'required:true, encrypt:true')
						     .build('bvn', 'required:false, encrypt:true') 
						     .build('cvv', 'required:true, encrypt:true') 
						     .build('expirymonth', 'required:true, encrypt:true')
						     .build('expiryyear', 'required:true, encrypt:true')
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end();


		specs['/mvva/validate'] = FlutterwaveBase.objectBuilder({})
						     .build('otptransactionidentifier', 'required:true, encrypt:true')
						     .build('otp', 'required:true, encrypt:true') 
						     .build('cardtype', 'required:false, encrypt:true')
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end(); 


		specs['/mvva/preauth'] = FlutterwaveBase.objectBuilder({})
						     .build('amount', 'required:true, encrypt:true')
						     .build('currency', 'required:true, encrypt:true') 
						     .build('chargetoken', 'required:true, encrypt:true')
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end();

		specs['/mvva/capture'] = FlutterwaveBase.objectBuilder({})
						     .build('amount', 'required:true, encrypt:true')
						     .build('currency', 'required:true, encrypt:true') 
						     .build('trxreference', 'required:true, encrypt:true')
						     .build('trxauthorizeid', 'required:true, encrypt:true')
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end();

		specs['/mvva/refund'] = FlutterwaveBase.objectBuilder({})
						     .build('amount', 'required:true, encrypt:true')
						     .build('currency', 'required:true, encrypt:true') 
						     .build('trxreference', 'required:true, encrypt:true')
						     .build('trxauthorizeid', 'required:true, encrypt:true')
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end();


		specs['/mvva/void'] = FlutterwaveBase.objectBuilder({})
						     .build('amount', 'required:true, encrypt:true')
						     .build('currency', 'required:true, encrypt:true') 
						     .build('trxreference', 'required:true, encrypt:true')
						     .build('trxauthorizeid', 'required:true, encrypt:true')
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end(); 

		specs['/mvva/status'] = FlutterwaveBase.objectBuilder({}) 
						     .build('trxreference', 'required:true, encrypt:true') 
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end();   

		return specs[path];
	} 

}

module.exports = FlutterwaveCard