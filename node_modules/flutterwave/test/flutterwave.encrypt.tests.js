'use strict';
var expect     = require('chai').expect;
var flwEncrypt = require('../lib/flw.encrypt');

describe('#FlutterwaveEncrypt', function () {

	it('Should encrypt "SMS" using the key "Tk_ksodk" and return "PjBSczoWdA4="', function ()
	{
		expect(flwEncrypt("Tk_ksodk", "SMS")).to.equal("PjBSczoWdA4=");
	});
});