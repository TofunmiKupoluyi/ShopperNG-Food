# IP class Examples
```
//Instantiate the class
var Flutterwave = require('flutterwave');
var flutterwave = new Flutterwave("YOUR_API_KEY","YOUR_MERCHANT_KEY");
``` 
## Call the IP methods

```
//Get information about an IP address
flutterwave.IP.check('216.58.211.100', callback);

//Successful response:
{ 
    data: 
    { 
        responsecode: '00',
        ipaddress: '216.58.211.100',
        alpha2code: 'US',
        alpha3code: 'USA',
        responsemessage: 'Completed Successfully',
        countryname: 'UNITED STATES',
        transactionreference: 'FLW00291181' 
    },
    status: 'success' 
}
```