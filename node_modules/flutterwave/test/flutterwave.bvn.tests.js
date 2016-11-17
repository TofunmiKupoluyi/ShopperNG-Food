'use strict';
var expect  = require('chai').expect;
var flwBase = require('../lib/flw.base');
var flwBvn = require('../lib/flw.bvn');

describe('#FlutterwaveBVNTest', function () {

	it('should throw bvn is required error for verify', function () { 
	    var flutterwavebase = new flwBase(8989,99899);
		var flutterwavebvn  = new flwBvn(flutterwavebase);
	    function testBvnVerify(){
	    	flutterwavebvn.verify('SMS', null, function () {});
	    }
	    expect(testBvnVerify).to.throw('bvn is required');
	});


	it('should throw otp is required error for validate', function () { 
	    var flutterwavebase = new flwBase(8989,99899);
		var flutterwavebvn  = new flwBvn(flutterwavebase);
	    function testBvnVerify(){
	    	flutterwavebvn.validate(null, 'bvn', 'transactionreference', function () {});
	    }
	    expect(testBvnVerify).to.throw('otp is required');
	}); 


	it('should throw transactionreference is required error for resendOtp', function () { 
	    var flutterwavebase = new flwBase(8989,99899);
		var flutterwavebvn  = new flwBvn(flutterwavebase);
	    function testBvnVerify(){
	    	flutterwavebvn.resendOTP('SMS', null, function () {});
	    }
	    expect(testBvnVerify).to.throw('transactionreference is required');
	}); 


	it('Should get "Successful, pending OTP validation" in responseMessage', function (done) { 
		this.timeout(500000);
	    var flutterwavebase = new flwBase('tk_NabYp2XjZ6G9WwdFruzK','tk_tdyrSMQo8a');
		var flutterwavebvn  = new flwBvn(flutterwavebase); 
    	flutterwavebvn.verify('SMS', '89999948', function (err, res, body) { 
    		expect(res.statusCode == 200).to.equal(true);
    		expect(body.data.responseMessage).to.equal('Invalid BVN');
    		done();
    	});
	   
	}); 


	it('Should get "Successful, pending OTP validation" in responseMessage', function (done) { 
		this.timeout(500000);
	    var flutterwavebase = new flwBase('tk_NabYp2XjZ6G9WwdFruzK','tk_tdyrSMQo8a');
		var flutterwavebvn  = new flwBvn(flutterwavebase); 
    	flutterwavebvn.resendOTP('SMS', 'FLW01230291323', function (err, res, body) {
    		expect(res.statusCode == 200).to.equal(true);
    		expect(body.data.responsemessage).to.equal('Successful, pending OTP validation');
    		done();
    	});
	   
	});

});