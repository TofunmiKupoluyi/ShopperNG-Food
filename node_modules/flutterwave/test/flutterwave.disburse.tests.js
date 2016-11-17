'use strict';
var expect  = require('chai').expect;
var flwBase = require('../lib/flw.base');
var flwDisburse = require('../lib/flw.disburse');

describe('#FlutterwaveDisburseTest', function () {

	it('Test required parameter missing error', function () { 
	    var flutterwavebase = new flwBase(8989,99899);
		var flutterwavedisburse = new flwDisburse(flutterwavebase);
	    function testCardVerify(){
	    	flutterwavedisburse.send({ 
		    'uniquereference':'203940',
		    'recipientaccount':'4444444',
		    'narration':'AOSLOS',
		    'recipientname':'Akinmolayan Phil',
		    'sendername':'Demiloye Jenkins',
		    'country':'NGN',
		    'destbankcode':'039',
		    'currency':'NGN'
		}, function () {});
	    }
	    expect(testCardVerify).to.throw('transferamount is required');
	});  


	it('Request test: ', function (done) { 
		this.timeout(50000);
	    var flutterwavebase = new flwBase(8989,99899);
		var flutterwavedisburse = new flwDisburse(flutterwavebase);
		flutterwavedisburse.send({
		    'transferamount':'9400394',
		    'uniquereference':'203940',
		    'recipientaccount':'4444444',
		    'narration':'AOSLOS',
		    'recipientname':'Akinmolayan Phil',
		    'sendername':'Demiloye Jenkins',
		    'country':'NGN',
		    'destbankcode':'039',
		    'currency':'NGN'
		}, function (err, res, body) { 
			expect(res.statusCode).to.equal(200); 
			expect(body).to.have.property('data');
			done(); 
		});
	     
	}); 

});