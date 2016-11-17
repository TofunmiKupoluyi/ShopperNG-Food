# BVN class Example
```
//Instantiate the class
var Flutterwave = require('flutterwave');
var flutterwave = new Flutterwave("YOUR_API_KEY","YOUR_MERCHANT_KEY");
```
## Call the BVN methods

```
/*
Verify a given BVN
*/
flutterwave.BVN.verify('VALIDATION_OPTION (SMS | VOICE)', 'BVN_NUMBER', function(err, res, jsonPayload){ console.log(body); } );

//Example Success Response
{ 
   data: 
   { 
   		transactionReference: 'FLW00291174',
     	responseMessage: 'Successful, pending OTP validation',
     	responseCode: '00' 
   },
  status: 'success' 
}
```

```
/*
Validate a given BVN (This is usually called after `BVN.verify` with the value for the OTP sent to the BVN user and transactionReference)
*/
flutterwave.BVN.validate('OTP', 'BVN', 'TRANSACTION_REFERENCE', function(err, res, jsonPayload) { /*do stuff with payload*/  } );

//Example Success Response
{ 
	data: 
    { 
    	imageBase64: '',
     	firstName: 'BVN USER FIRSTNAME',
     	lastName: 'BVN USER LASTNAME',
     	phoneNumber: 'BVN USER PHONENUMBER',
     	enrollmentBranch: 'BVN USER ENROLMENT BRANCH',
     	registrationDate: '13-OCT-15',
     	enrollmentBank: 'ENROLMENT BANK CODE',
     	dateOfBirth: 'BVN USER DATE OF BIRTH',
     	middleName: 'BVN USER MIDDLENAME',
     	bvn: 'BVN',
     	responseMessage: 'Completed Successfully',
     	responseCode: '00' 
    },
    status: 'success' 
}
```

```
/*
Resend OTP in case User does't get an OTP after the BVN.verify call. (Use transaction reference from `BVN.verify` call)
*/
flutterwave.BVN.resendOTP('(SMS | VOICE)', 'TRANSACTION_REFERENCE', function(err, res, jsonPayload) { /*do stuff with payload*/  } );

//Example Success Response
{ 
   data: 
   { 
     	responseMessage: 'Successful, pending OTP validation',
     	responseCode: '00' 
   },
  status: 'success' 
}
```