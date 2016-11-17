var base     = require('./lib/flw.base');
var ip       = require('./lib/flw.ip');
var bvn      = require('./lib/flw.bvn');
var bank     = require('./lib/flw.bank');
var card     = require('./lib/flw.card');
var account  = require('./lib/flw.account');
var disburse = require('./lib/flw.disburse');
var bin      = require('./lib/flw.bin');
var ach      = require('./lib/flw.ach');


var Flutterwave = function (merchant_key, merchant_secret)
{

	var flwbase      = new base(merchant_key, merchant_secret);
	this.IP          = new ip(flwbase); 
	this.BVN         = new bvn(flwbase);
	this.Bank        = new bank(flwbase);
	this.Card        = new card(flwbase);
	this.Account     = new account(flwbase);
	this.Disburse    = new disburse(flwbase);
	this.BIN         = new bin(flwbase);
	this.ACH         = new ach(flwbase);
	this.decryptText = flwbase.decryptText(merchant_key);

} 


module.exports = Flutterwave;