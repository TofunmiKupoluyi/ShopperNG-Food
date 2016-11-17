'use strict';
var expect  = require('chai').expect;
var flwBase = require('../lib/flw.base');
var flwBin = require('../lib/flw.bin');

describe('#FlutterwaveBINTest', function () {

	it('Should throw card6 is required error', function () {
		  
		  var flwbase = new flwBase(1234,23334);
		  var flwbin  = new flwBin(flwbase); 
		  function testBinCheck(){
		  	flwbin.check();
		  }
		  expect(testBinCheck).to.throw('card6 is required');

	});


	it('GET BIN Info', function (done) {
		  this.timeout(400000);
		  var flwbase = new flwBase(1234,23334);
		  var flwbin  = new flwBin(flwbase); 
		  flwbin.check('484250' , function (err, res, body) { 
		  	expect(res.statusCode == 200).to.equal(true);
		  	expect(body).to.have.property('data');
		  	done();
		  });

	});    

});