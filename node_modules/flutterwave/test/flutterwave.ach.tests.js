'use strict';
var expect  = require('chai').expect;
var flwBase = require('../lib/flw.base');
var flwAch  = require('../lib/flw.ach');


var api_key = 'tk_oiy50LC4XJPTESRezY9v';
var mer_key = 'tk_quLNXIghks';

describe('#FlutterwaveACHTest', function () {

	it('Should return a list of ACH institutions', function (done) {
		this.timeout(50000);
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
	    flutterwaveach.getInstitutions(function(err, res, body){ 
	    	console.log(body);
	    	expect(res.statusCode == 200 && body.status == 'success').to.equal(true);
	    	done();	
	    }); 
	});


	it('Should throw institutionid is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.getInstitutionById(null,function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('institutionid is required');
	}); 


	it('Should throw username is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.getUserTransactions({
		    	"password":"*****",
		    	"email":"schl@gmail.com",
		    	"pin":"1234",
		    	"institution":"Debian UINC"
		    },function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('username is required');
	}); 


	it('Should throw password is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.getUserTransactions({
		    	"username":"Shclum",
		    	"email":"schl@gmail.com",
		    	"pin":"1234",
		    	"institution":"Debian UINC"
		    },function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('password is required');
	}); 


	it('Should throw email is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.getUserTransactions({
		    	"username":"Shclum",
		    	"password":"schl@gmail.com",
		    	"pin":"1234",
		    	"institution":"Debian UINC"
		    },function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('email is required');
	}); 


	it('Should throw pin is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.getUserTransactions({
		    	"username":"Shclum",
		    	"password":"schl@gmail.com",
		    	"email":"1234",
		    	"institution":"Debian UINC"
		    },function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('pin is required');
	});



	it('Should throw institution is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.getUserTransactions({
		    	"username":"Shclum",
		    	"password":"schl@gmail.com",
		    	"email":"1234",
		    	"pin":"1233"
		    },function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('institution is required');
	}); 


	it('Should throw publictoken is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.chargeACH({
			  "publictSoken": "(Encrypted PublicToken)",
			  "accountid": "(Encrypted Account ID)", 
			  "custid":"(Encrypted Cust Id)",
			  "narration": "(Encrypted Narration)",
			  "trxreference":"(Encrypted Unique Reference)",
			  "amount":"(Encrypted Amount)",
			  "currency":"(Encrypted Currency)"
			},function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('publictoken is required');
	});



	it('Should throw accountid is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.chargeACH({
			  "publictoken": "(Encrypted PublicToken)",
			  "accountids": "(Encrypted Account ID)", 
			  "custid":"(Encrypted Cust Id)",
			  "narration": "(Encrypted Narration)",
			  "trxreference":"(Encrypted Unique Reference)",
			  "amount":"(Encrypted Amount)",
			  "currency":"(Encrypted Currency)"
			},function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('accountid is required');
	});


	it('Should throw custid is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.chargeACH({
			  "publictoken": "(Encrypted PublicToken)",
			  "accountid": "(Encrypted Account ID)", 
			  "custsid":"(Encrypted Cust Id)",
			  "narration": "(Encrypted Narration)",
			  "trxreference":"(Encrypted Unique Reference)",
			  "amount":"(Encrypted Amount)",
			  "currency":"(Encrypted Currency)"
			},function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('custid is required');
	});



it('Should throw narration is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.chargeACH({
			  "publictoken": "(Encrypted PublicToken)",
			  "accountid": "(Encrypted Account ID)", 
			  "custid":"(Encrypted Cust Id)",
			  "narrsation": "(Encrypted Narration)",
			  "trxreference":"(Encrypted Unique Reference)",
			  "amount":"(Encrypted Amount)",
			  "currency":"(Encrypted Currency)"
			},function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('narration is required');
	});


it('Should throw trxreference is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.chargeACH({
			  "publictoken": "(Encrypted PublicToken)",
			  "accountid": "(Encrypted Account ID)", 
			  "custid":"(Encrypted Cust Id)",
			  "narration": "(Encrypted Narration)",
			  "trxreferences":"(Encrypted Unique Reference)",
			  "amount":"(Encrypted Amount)",
			  "currency":"(Encrypted Currency)"
			},function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('trxreference is required');
	});


	it('Should throw amount is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.chargeACH({
			  "publictoken": "(Encrypted PublicToken)",
			  "accountid": "(Encrypted Account ID)", 
			  "custid":"(Encrypted Cust Id)",
			  "narration": "(Encrypted Narration)",
			  "trxreference":"(Encrypted Unique Reference)",
			  "amounts":"(Encrypted Amount)",
			  "currency":"(Encrypted Currency)"
			},function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('amount is required');
	});


	it('Should throw currency is required error', function () { 
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		function errorThrowTest() {
		    flutterwaveach.chargeACH({
			  "publictoken": "(Encrypted PublicToken)",
			  "accountid": "(Encrypted Account ID)", 
			  "custid":"(Encrypted Cust Id)",
			  "narration": "(Encrypted Narration)",
			  "trxreference":"(Encrypted Unique Reference)",
			  "amount":"(Encrypted Amount)",
			  "currencys":"(Encrypted Currency)"
			},function(err, res, body){ 
		    	 
		    }); 
		}
		expect(errorThrowTest).to.throw('currency is required');
	});


	it('Should charge an ACH', function (done) {
		this.timeout(50000);
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		console.log(
	    flutterwaveach.chargeACH({
			  "publictoken": "(Encrypted PublicToken)",
			  "accountid": "(Encrypted Account ID)", 
			  "custid":"(Encrypted Cust Id)",
			  "narration": "(Encrypted Narration)",
			  "trxreference":"(Encrypted Unique Reference)",
			  "amount":"(Encrypted Amount)",
			  "currency":"(Encrypted Currency)"
			}, function(err, res, body){ 
	    	console.log(body);
	    	expect(res.statusCode == 200 && body.status == 'success').to.equal(true);
	    	done();	
	    }) );
	});


	it('Should add a new user', function (done) {
		this.timeout(50000);
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
		console.log(
	    flutterwaveach.getUserTransactions({
		    	"username":"plaid_test",
		    	"password":"plaid_good",
		    	"email":"schkd@gmail.com",
		    	"institution":"wells",
		    	"pin":"1233"
		    }, function(err, res, body){ 
	    	console.log(body);
	    	expect(res.statusCode == 200 && body.status == 'success').to.equal(true);
	    	done();	
	    }) );
	});



	it('Should return information about The Bank of America', function (done) {
		this.timeout(50000);
	    var flutterwavebase = new flwBase(api_key,mer_key);
		var flutterwaveach  = new flwAch(flutterwavebase);
	    flutterwaveach.getInstitutionById("5301a93ac140de84910000e0", function(err, res, body){ 
	    	console.log(body);
	    	expect(res.statusCode == 200 && body.status == 'success').to.equal(true);
	    	done();	
	    }); 
	});


});