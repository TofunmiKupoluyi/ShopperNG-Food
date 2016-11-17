# Account class Examples
```
//Instantiate the class
var Flutterwave = require('flutterwave');
var flutterwave = new Flutterwave("YOUR_API_KEY","YOUR_MERCHANT_KEY");
```
## Call the Account methods

```
//Charge an account
flutterwave.Account.charge('44449309', callback);

//Example success response
{
  "data": {
    "amount": null,
    "transactionreference": null,
    "responseMessage": "Successful, pending OTP validation",
    "accountToken": "4rOPbaVkM70Nr6Z9587",
    "responseCode": "00"
  },
  "status": "success"
}
```

```
//Validate an account charge
/*
After succesfully charging an account you can pass the accountToken from the charge response [see above] to validate
*/
flutterwave.Account.validate({
	'amountToPay':'4000', 
	'otp':'4884993849',
	'trxref':'FLW00291105',
	'accountToken':'MEANI'
}, callback);
```

## Recurrent Transactions

```
//Initiate (For setting up a bank account for recurrent payment)
flutterwave.Account.initiateRecurrentPayment('4884993849', callback);

//Example success response
{
  "data": {
    "responseCode": "00",
    "responseMessage": "Successful, Pending OTP Validation",
    "transactionReference": "FLWBVN-1452847433079228"
  },
  "status": "success"
}
```

```
//Validate - Usually called after `initiateRecurrentPayment` (For validating a bank account been setup for recurrent payment)
flutterwave.Account.validateRecurrentAccount({ 
  'accountNumber':'8399489',
  'otp':'88839',
  'reference':'FLWBVN-1452847433079228',
  'billingamount':'6500',
  'debitnarration':'SMILE SUBSCRIPTION'
}, callback);

//Example success response
{
  "data": {
    "transactionreference ": "FLWRECUR-135677633",
    "responseCode": "00",
    "accountToken": "qRyPWB60dR63t8XDc97aEg",
    "responseDescription": "Successfully completed"
  },
  "status": "success"
}
```


```
//Charge (For charging a bank account that has been setup for recurrent payment)
flutterwave.Account.chargeRecurrentAccount({  
  'accountToken':'qRyPWB60dR63t8XDc97aEg',
  'billingamount':'6500',
  'debitnarration':'SMILE SUBSCRIPTION'
}, callback);

//Example success response
{
  "data": {
    "transactionreference ": "FLWRECUR-135677633",
    "responseCode": "00",
    "responseDescription": "Successfully completed"
  },
  "status": "success"
}
```