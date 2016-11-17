# Bank class Examples
```
//Instantiate the class (Always do this before calling any of the class methods)
var Flutterwave = require('flutterwave');
var flutterwave = new Flutterwave("YOUR_API_KEY","YOUR_MERCHANT_KEY");
```
## Call the Bank methods

```
//Get List of Banks
flutterwave.Bank.getBanks(callback);


//Example Success Response
{ 
	data: 
    { 
     	'100': 'SunTrust Bank',
     	'214': 'First City Monument Bank',
     	'215': 'Unity Bank',
     	'221': 'Stanbic IBTC Bank',
     	'232': 'Sterling Bank',
     	'301': 'JAIZ Bank',
     	'302': 'Eartholeum',
     	'303': 'ChamsMobile',
     	'304': 'Stanbic Mobile Money',
     	'305': 'Paycom',
     	'306': 'eTranzact',
     	'307': 'EcoMobile',
     	'308': 'FortisMobile',
     	'309': 'FBNMobile'
    },
    status: 'success' 
}
```
