/**
* Flutterwave ACH class
*
* @class FlutterwaveAch
* @constructor
*/ 

var FlutterwaveAch = function (FlutterwaveBase) {


	/**
	* Retrieves a list of Institutions
	*
	* @method getInstitutions 
	* @param {Function} callback
	*/ 
	this.getInstitutions = function (callback) {

		var requestParams      = {};
		requestParams.data     = {};
		requestParams.method   = 'POST'; 

		requestParams.data.merchantid = FlutterwaveBase.getMerchantKey();
		return FlutterwaveBase.makeRequest('card/mvva/institutions',  requestParams, callback);
	}



	/**
	* Gets an institution by ID
	*
	* @method getInstitutionById
	* @param {String}   institutionId
	* @param {Function} callback
	*/
	this.getInstitutionById = function (institutionId, callback) {

		var requestParams      = {};
		requestParams.method   = 'POST'; 
		requestParams.data     = {};
		requestParams.data.merchantid    = FlutterwaveBase.getMerchantKey();
		requestParams.data.institutionid = institutionId;

		requestParams.data = FlutterwaveBase.validateAndEncryptParams(requestParams.data, this.endpointParamSpec('/institutions/id'), FlutterwaveBase.getMerchantAPIKey());
		return FlutterwaveBase.makeRequest('card/mvva/institutions/id', requestParams, callback);
	}


	/**
	* Adds a user
	*
	* @method addUser
	* @param {Object} userData {username, password, pin, merchantid, email, institution}
	* @param {Function} callback
	*/
	this.getUserTransactions = function(userData, callback) {

		var requestParams    = {};
		userData.merchantid  = FlutterwaveBase.getMerchantKey();
		requestParams.data   = FlutterwaveBase.validateAndEncryptParams(userData, this.endpointParamSpec('/mvva/adduser'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method = 'POST';
		return FlutterwaveBase.makeRequest('card/mvva/adduser', requestParams, callback);
	}




	/**
	* Adds a user
	*
	* @method chargeACH
	* @param {Object} chargeData {publictoken, accountid, custid, merchantid, narration, trxreference, amount, currency}
	* @param {Function} callback
	*/
	this.chargeACH = function(chargeData, callback) {

		var requestParams    = {};
		chargeData.merchantid  = FlutterwaveBase.getMerchantKey();
		requestParams.data   = FlutterwaveBase.validateAndEncryptParams(chargeData, this.endpointParamSpec('/mvva/chargeach'), FlutterwaveBase.getMerchantAPIKey());
		requestParams.method = 'POST';
		return FlutterwaveBase.makeRequest('card/mvva/chargeach', requestParams, callback);
	}




	this.endpointParamSpec = function (path)
	{
		var specs = {};
		specs['/institutions/id'] = FlutterwaveBase.objectBuilder({})
						     .build('institutionid', 'required:true, encrypt:true') 
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end(); 


		specs['/mvva/adduser']   = FlutterwaveBase.objectBuilder({})
						     .build('username', 'required:true, encrypt:true') 
						     .build('password', 'required:true, encrypt:true') 
						     .build('pin', 'required:true, encrypt:true') 
						     .build('email', 'required:true, encrypt:true') 
						     .build('institution', 'required:true, encrypt:true') 
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end(); 


		specs['/mvva/chargeach']  = FlutterwaveBase.objectBuilder({})
						     .build('publictoken', 'required:true, encrypt:true') 
						     .build('accountid', 'required:true, encrypt:true') 
						     .build('custid', 'required:true, encrypt:true') 
						     .build('narration', 'required:true, encrypt:true') 
						     .build('trxreference', 'required:true, encrypt:true') 
						     .build('amount', 'required:true, encrypt:true') 
						     .build('currency', 'required:true, encrypt:true') 
						     .build('country', 'required:true, encrypt:true')
						     .build('merchantid', 'required:true, encrypt:false') 
						     .end(); 
   

		return specs[path];
	}  


}

module.exports = FlutterwaveAch;