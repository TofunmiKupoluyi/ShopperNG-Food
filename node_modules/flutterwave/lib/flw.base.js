var FlutterwaveUtils  = require('./flw.utils'); 
var Request           = require('request');
/**
* Flutterwave base class
*
* @class Flutterwave
* @constructor
*/
var FlutterwaveBase = function (merchant_api_key, merchant_key) {

	FlutterwaveUtils.emptyCheck(merchant_api_key, 'API Key required');
	FlutterwaveUtils.emptyCheck(merchant_key,     'Merchant Key required');

	var merchant_api_key = merchant_api_key;
	var merchant_key     = merchant_key;

	var base_url      = 'http://staging1flutterwave.co:8080/pwc/rest';

	this.getMerchantAPIKey = function () {
		return merchant_api_key;
	} 

	this.getMerchantKey = function () {
		return merchant_key;
	}

	this.getBaseUrl = function () {
		return base_url;
	}

	this.setBaseUrl = function (new_base_url) {
		if(new_base_url){
			base_url = new_base_url;
		}	
	}

	this.makeRequest = function (path, payload, callback){
		var requestOptions = {};
		var requestMethod  = FlutterwaveUtils.initDefaultValue(payload.method, 'GET');
		var datakey        = requestMethod == 'POST' ? 'body' : 'qs';
		var requestJSON    = datakey == 'body' ? true : false;

		requestOptions.uri      = path;
		requestOptions.baseUrl  = this.getBaseUrl();
		requestOptions.method   = requestMethod;
		requestOptions[datakey] = FlutterwaveUtils.initDefaultValue(payload.data, {});
		requestOptions.json     = requestJSON;
		requestOptions.headers  = {'Content-Type':'application/json'};

		callback = FlutterwaveUtils.initDefaultValue(callback, function () { } );
		Request(requestOptions,  
				function (err, res, body)
				{
					res.flutterwaveRequestSuccessful         = false;
					res.flutterwaveRequestRequiresValidation = false; 
					if(body && body.data && body.status == 'success' && ~['00','0','02'].indexOf(body.data.responseCode) )
					{
						res.flutterwaveRequestSuccessful = true;
					}

					if(body && body.responseCode == '02'){
						res.flutterwaveRequestRequiresValidation = true;
					}
					callback(err, res, body);
				}
		);
		return requestOptions;
	}

}


FlutterwaveBase.prototype.paramCheck = function (param, fail_message) {
	FlutterwaveUtils.emptyCheck(param, fail_message);
}

FlutterwaveBase.prototype.objectBuilder = function (eval_dict) {
	var objectbuilder = require('./flw.objectbuilder');
	return new objectbuilder(eval_dict);
}

FlutterwaveBase.prototype.decryptText = function (key) {
	key = key || '';
	return function (encrypted_text, key_to_use) {
		key_to_use = FlutterwaveUtils.initDefaultValue(key_to_use, key);
		return require('./flw.decrypt')(key_to_use, encrypted_text);
	} 
}

FlutterwaveBase.prototype.validateAndEncryptParams = function (params, paramDictionary, encryptKey) {
	var returnParams = {}; //This is so we only take what we need no matter the amount of params passed
	for( p in paramDictionary )
	{
		if(paramDictionary.hasOwnProperty(p))
		{  
			if( params[p] )
			{
				returnParams[p] = params[p];
			}
			var expectedParam = paramDictionary[p];
			if ( expectedParam.required == 'true' ) {
				this.paramCheck(params[p], p + ' is required');
			}

			if( expectedParam.encrypt == 'true' && returnParams[p] ) { 
				returnParams[p]= require('./flw.encrypt')(encryptKey, params[p] + '');
			}else {
				
			}
		}
	}
	return returnParams;
}

FlutterwaveBase.prototype.paramEncrypt = function (encryptKey, encryptDict, params) {

	for(var p in params){
		if(params.hasOwnProperty(p))
		{
			var param = params[p];
			if( encryptDict[p].encrypt == 'true'){
				params[p] = require('./flw.encrypt')(encryptKey, params[p]);
			}
		}
	}
	return params;

}

FlutterwaveBase.prototype.getCountryCodes = function () {
	var codes = this.objectBuilder({}).build('NIGREIA:NG')
				.build('GHANA:GH')
				.build('UNITED STATES:US')
				.build('KENYA:KE')
				.build('UNITED KINGDOM:UK')
				.end();
	return codes;
}

FlutterwaveBase.prototype.getCountryCode = function (country_name) {

	if(country_name && typeof country_name == 'string')
	{
		country_name = country_name.toUpperCase().trim();
		var codes = this.getCountryCodes();
		if(codes[country_name])
		{
			return codes[country_name];
		}
	}

	return null;

}

FlutterwaveBase.prototype.getCurrencyCode = function (code_name) {
	var currencies = this.objectBuilder({}).build('NAIRA:NGN')
					 .build('DOLLARS:USD')
					 .build('POUNDS:GBP')
					 .build('EURO:EURO')
					 .build('GHANACEDIS:GHS')
					 .build('KENYASHILLING:KES')
					 .end();
	if( code_name && typeof code_name == 'string')
	{
		code_name = code_name.toUpperCase().trim();
		if(currencies[code_name]){
			return currencies[code_name];
		}
	}

	return null;
}


module.exports = FlutterwaveBase;