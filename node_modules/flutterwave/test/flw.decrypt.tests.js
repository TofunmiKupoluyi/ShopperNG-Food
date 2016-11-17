'use strict';
var expect     = require('chai').expect;
var flwDecrypt = require('../lib/flw.decrypt');

describe('#FlutterwaveDecrypt', function () {

	it('Should Decrypt "PjBSczoWdA4=" using the key "Tk_ksodk" and return "SMS"', function ()
	{
		expect(flwDecrypt("Tk_ksodk", "PjBSczoWdA4=")).to.equal("SMS");
	});
});