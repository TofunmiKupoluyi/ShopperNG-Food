'use strict';
var expect  = require('chai').expect;
var flwBase = require('../lib/flw.base');

describe('#FlutterwaveBaseTest', function () {

	it('Should throw API Key required', function () {

		function testUtil(){
			 new flwBase();
		}
		expect(testUtil).to.throw('API Key required');

	}); 

	it('Should throw Merchant Key required', function () {

		function testUtil(){
			 new flwBase(83948);
		}
		expect(testUtil).to.throw('Merchant Key required');

	}); 

	it('Should not throw any error', function () {

		function testUtil(){
			  new flwBase(83948, 98989);
		}
		expect(testUtil).to.not.throw('Merchant Key required');

	}); 


	it('Base URL Test', function () {

		var flwbase = new flwBase(83948, 98898);

		expect(flwbase.getBaseUrl()).to.equal('http://staging1flutterwave.co:8080/pwc/rest');

	}); 


	it('Merchant key and api key test', function () {

		var flwbase = new flwBase(83948, 98898);

		expect(flwbase.getMerchantKey() +''+ flwbase.getMerchantAPIKey()).to.equal('9889883948');

	}); 

	it('Should Decrypt "PjBSczoWdA4=" using the key "Tk_ksodk" and return "SMS"', function ()
	{
		var flwbase = new flwBase(83948, 98898);
		expect(flwbase.decryptText("PjBSczoWdA4=", "Tk_ksodk")).to.equal("SMS");
	});

	it('Should return with a 404', function (done) {

		var flwbase = new flwBase(83948, 98898);
		flwbase.makeRequest('banks', {}, function (err, res, body){
			expect(res.statusCode).to.equal(404); 
			done();
		});

	});


	it('Should return with a 405', function (done) {

		var flwbase = new flwBase(83948, 98898);
		flwbase.makeRequest('fw/banks', {}, function (err, res, body){
			expect(res.statusCode).to.equal(405); 
			done();
		});

	});
	

	it('Should return with a 200', function (done) {

		var flwbase = new flwBase(83948, 98898);
		flwbase.makeRequest('fw/ipcheck', {method:'POST'}, function (err, res, body){
			expect(res.statusCode).to.equal(200); 
			done();
		});

	});

});