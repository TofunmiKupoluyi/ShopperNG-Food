# Card class Examples
```
//Instantiate the class
var Flutterwave = require('flutterwave');
var flutterwave = new Flutterwave("YOUR_API_KEY","YOUR_MERCHANT_KEY");
``` 
## Call the Card methods

```
//Tokenize a transaction 
```
(_Tokenization is the process of masking sensitive card information and returning a token that can be used to place a charge on the card at a later date_)
```
flutterwave.Card.tokenize
    ( 
        {
            'validateoption':'SMS|VOICE',
            'authmodel':'NOAUTH', /*Only NOAUTH and BVN are accepted*/ 
            "bvn": "(Optional:Only needed where authmodel is BVN)",
            'cardno':'83994899',
            'cvv':'434',
            'expirymonth':'05',
            'expiryyear':'2016',

        } , 
        callback 
    )

//Example success response
{
  "data": {
    "responsecode": "00",
    "responsemessage": "Completed Successfully",
    "otptransactionidentifier": null,
    "transactionreference": null,
    "responsehtml": null,
    "responsetoken": "oTwXtFqKQj00kO39896"
  },
  "status": "success"
}
```


```
//Charge a card
/*Note that the country parameter is required if you are specifying a currency other than "NGN"*/
flutterwave.Card.charge
    ( 
        {
            "amount": "46738",
            "authmodel": "PIN | BVN | RANDOM_DEBIT | VBVSECURECODE | NOAUTH",
            "cardno": "9934889489",
            "currency": "NGN",
            "country": "NG",
            "custid": "849389",
            "cvv": "433", 
            "expirymonth": "09",
            "pin": "(Optional:Only needed where authmodel is PIN)",
            "bvn": "(Optional:Only needed where authmodel is BVN)",
            "expiryyear": "10", 
            "narration": "somto masombe",
            "responseurl": "http://valuex.com"

        } , 
        callback 
    )

//Example response
{
  "data": {
    "responsecode": "00",
    "responsemessage": "Successful",
    "otptransactionidentifier": null,
    "transactionreference": "FLWT00291353",
    "responsehtml": null,
    "responsetoken": "vTXqynzWIT0b3rA4497"
  },
  "status": "success"
}
```

```
//Validate transaction (If you pass a value other than NOAUTH to the charge method's authmodel, you need to validate the charge using this method)
flutterwave.Card.validate
    ( 
        {
            otptransactionidentifier: '83948', 
            otp:'3849', 
        } , 
        callback 
    )
```


```
//Place a hold on an amount for a given card without actually charging the card
flutterwave.Card.preauth
    ( 
        {
            chargetoken: '83948', 
            amount:'3849',
            currency:'NGN'
        } , 
        callback 
    )

//Example response
{
  "data": {
    "responsecode": "0",
    "authorizeId": "1471277772257",
    "responsemessage": "Successful",
    "otptransactionidentifier": null,
    "transactionreference": "FLW00291377",
    "responsehtml": null,
    "responsetoken": null
  },
  "status": "success"
}
```

```
//Capture. Charge a card that's been preauthorized
flutterwave.Card.capture
    ( 
        {
            amount: '83948',
            currency: 'NGN',
            trxreference: 'FLW00291377',
            trxauthorizeid: '1471277772257'
            
        } , 
        callback 
    )

//Example response
{
  "data": {
    "responsecode": "0",
    "authorizeId": "",
    "responsemessage": "Successful",
    "otptransactionidentifier": null,
    "transactionreference": "FLW00291378",
    "responsehtml": null,
    "responsetoken": null
  },
  "status": "success"
}
```


```
//Reverses a card transaction
flutterwave.Card.void(
    { 
        amount: '655556',
        currency: 'NGN',
        trxreference: 'FLW00291105',
        trxauthorizeid: '49093' 
    }, callback);
```

```
//Refund the amount preauthed on a card
flutterwave.Card.refund( 
    {
       amount: '83948',
       currency: 'NGN',
       trxreference: 'FLW00291105',
       trxauthorizeid: '0392930'
    } , callback) 
```



