# Disburse class Examples

_The disburse API enables transfer of funds to any financial institution in any of our supported countries._
```
//Instantiate the class
var Flutterwave = require('flutterwave');
var flutterwave = new Flutterwave("YOUR_API_KEY","YOUR_MERCHANT_KEY");
``` 
## Call the Disburse methods

```
//Send money to a recipient
flutterwave.Disburse.send({
    'transferamount':'9400394',
    'uniquereference':'233456',
    'recipientaccount':'0123453241',
    'narration':'AOSLOS',
    'recipientname':'Akinmolayan Phil',
    'sendername':'Demiloye Jenkins',
    'country':'NG',
    'destbankcode':'058',
    'currency':'NGN'
},callback);
```