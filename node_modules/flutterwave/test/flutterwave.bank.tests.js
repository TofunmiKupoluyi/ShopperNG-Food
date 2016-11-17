'use strict';
var expect  = require('chai').expect;
var flwBase = require('../lib/flw.base');
var flwBank = require('../lib/flw.bank');

describe('#FlutterwaveBankTest', function () {

	it('Should return a list of bank information', function (done) {
		this.timeout(50000);
	    var flutterwavebase = new flwBase(8989,99899);
		var flutterwavebank   = new flwBank(flutterwavebase);
	    flutterwavebank.getBanks(function(err, res, body){ 
	    	expect(res.statusCode == 200 && body.status == 'success').to.equal(true);
	    	done();	
	    }); 
	});   

});