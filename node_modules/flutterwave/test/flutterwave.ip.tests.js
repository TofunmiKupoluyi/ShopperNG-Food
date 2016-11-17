'use strict';
var expect  = require('chai').expect;
var flwBase = require('../lib/flw.base');
var flwIp = require('../lib/flw.ip');

describe('#FlutterwaveIPTest', function () {

	it('Should throw No ip argument passed error', function () {

		function testUtil(){
			 var flutterwavebase = new flwBase(8989,99899);
			 var flutterwaveip   = new flwIp(flutterwavebase);
			 flutterwaveip.check();

		}
		expect(testUtil).to.throw('No ip argument passed');

	}); 


	it('Should not throw No ip argument passed error', function () {

		function testUtil(){
			 var flutterwavebase = new flwBase(8989,99899);
			 var flutterwaveip   = new flwIp(flutterwavebase);
			 flutterwaveip.check('12.934.33');

		}
		expect(testUtil).to.not.throw('No ip argument passed');

	}); 


	it('Should return IP information', function (done) {
		this.timeout(50000);
	    var flutterwavebase = new flwBase(8989,99899);
		var flutterwaveip   = new flwIp(flutterwavebase);
	    flutterwaveip.check('216.58.211.100', function(err, res, body){
	    	expect(res.statusCode == 200 && body.status == 'success').to.equal(true);
	    	done();	
	    }); 
	});    

});