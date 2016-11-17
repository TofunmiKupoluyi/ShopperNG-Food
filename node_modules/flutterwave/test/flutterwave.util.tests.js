'use strict';
var expect  = require('chai').expect;
var flwUtil = require('../lib/flw.utils');

describe('#FlutterwaveUtilTest', function () {

	it('Should throw merchant id not passed error', function () {

		function testUtil(){
			var merchantid;
			flwUtil.emptyCheck(merchantid, 'merchant id not passed');
		}
		expect(testUtil).to.throw('merchant id not passed');

	});


	it('Should not throw merchant id not passed error', function () {

		function testUtil(){
			var merchantid = 930049;
			flwUtil.emptyCheck(merchantid, 'merchant id not passed');
		}
		expect(testUtil).to.not.throw('merchant id not passed');

	});


	it('Should throw some error occured', function () {

		function testUtil(){
			var merchantid = 930049;
			flwUtil.emptyCheck();
		}
		expect(testUtil).to.throw('Some error occured');

	});

});