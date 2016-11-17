# BIN class Examples
```
//Instantiate the class
var Flutterwave = require('flutterwave');
var flutterwave = new Flutterwave("YOUR_API_KEY","YOUR_MERCHANT_KEY");
``` 
## Call the BIN methods

```
//Get information about a card using its first 6 digits
flutterwave.BIN.check('FIRST_6_DIGITS_OF_CARD', callback);

//Successful response:
{ 
	data: 
    { 
    	'country': 'NIGERIA NG',
     	'cardBin': 'FIRST_6_DIGITS_OF_CARD',
     	'cardName': 'CARD NAME INF0',
     	'transactionReference': 'FLW00291173',
     	'responseMessage': 'Completed Successfully',
     	'responseCode': '00' 
    },
    status: 'success' 
}
```