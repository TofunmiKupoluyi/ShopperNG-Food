'use strict';
var expect  = require('chai').expect;
var flwBase = require('../lib/flw.base');
var flwCard = require('../lib/flw.card');

describe('#FlutterwaveCardTest', function () {

	it('Should throw Test required parameter missing error', function () { 
	    var flutterwavebase = new flwBase(8989,99899);
		var flutterwavecard  = new flwCard(flutterwavebase);
	    function testCardVerify(){
	    	flutterwavecard.charge({}, function () {});
	    }
	    expect(testCardVerify).to.throw('amount is required');
	});


	it('Should get 200 http response code and response body should have property data', function (done) { 
		this.timeout(50000);
	    var flutterwavebase = new flwBase(8989,99899);
		var flutterwavecard  = new flwCard(flutterwavebase);
		flutterwavecard.charge({
			amount:1234,
			authmodel:'BVN', 
			cardno:'5637346511023811',
			currency:'NGN',
			custid:'930049',
			cvv:'793',
			cardtype:'VISA',
			expirymonth:'05',
			expiryyear:'19',
			narration:'SOME RAND VALUE',  
			responseurl:'http://somerandresponseurl'
		}, function (err, res, body) { 
			expect(res.statusCode).to.equal(200); 
			expect(body).to.have.property('data');
			done(); 
		});
	     
	}); 

});