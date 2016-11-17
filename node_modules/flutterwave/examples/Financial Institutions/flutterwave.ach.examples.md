# ACH class Examples
```
//Instantiate the class (Always do this before calling any of the class methods)
var Flutterwave = require('flutterwave');
var flutterwave = new Flutterwave("YOUR_API_KEY","YOUR_MERCHANT_KEY");
```
## Call the ACH methods

```
//Get a List of Institutions
flutterwave.ACH.getInstitutions(callback);


//Example Success Response
{
  "data": {
    "institutions": [
      {
        "credentials": {
          "password": "Password",
          "pin": null,
          "username": "Online ID"
        },
        "name": "Bank of America",
        "hasmfa": true,
        "id": "5301a93ac140de84910000e0",
        "type": "bofa",
        "mfatypes": [
          "code",
          "list",
          "questions(3)"
        ]
      },
      {
        "credentials": {
          "password": "Password",
          "pin": null,
          "username": "Username"
        },
        "name": "Wells Fargo",
        "hasmfa": false,
        "id": "5301aa096b3f822b440001cb",
        "type": "wells",
        "mfatypes": []
      }
    ],
    "responsecode": "00",
    "responsemessage": "Successful",
    "transactionreference": "FLWT00296525"
  },
  "status": "success"
}
```


```
//Get an Institution by ID
flutterwave.ACH.getInstitutionById("5301a93ac140de84910000e0", callback);


//Example Success Response
{
  "data": {
    "institutions": [
      {
        "credentials": {
          "password": "Password",
          "pin": null,
          "username": "Online ID"
        },
        "name": "Bank of America",
        "hasmfa": true,
        "id": "5301a93ac140de84910000e0",
        "type": "bofa",
        "mfatypes": [
          "code",
          "list",
          "questions(3)"
        ]
      }
    ],
    "responsecode": "00",
    "responsemessage": "Successful",
    "transactionreference": "FLWT00296534"
  },
  "status": "success"
}
```


```
//Add Charge ACH
flutterwave.ACH.chargeACH({
                "username":"plaid_test",
                "password":"plaid_good",
                "email":"schkd@gmail.com",
                "institution":"Schlum Princely Inc",
                "pin":"1233"
            }, callback);

//Example Success Response
{
  "data": {
      {
    "responsetoken": null,
    "responsecode": "00",
    "responsemessage": "Successful",
    "transactionreference": "TST345728922",
    "otptransactionidentifier": null,
    "responsehtml": null
      }
  },
  "status": "success"
}
```

```
//Add a user
flutterwave.ACH.addUser({
                "username":"plaid_test",
                "password":"plaid_good",
                "email":"schkd@gmail.com",
                "institution":"Schlum Princely Inc",
                "pin":"1233"
            }, callback);


//Example Success Response
{
  "data": {
    {
  "responsecode": "00",
  "responsemessage": "Successful",
    "transactionreference": "FLWT00296352",
    "accounts": [
    {
      "balance": {
        "available": 1203.42,
        "current": 1274.93
      },
      "meta": {
        "limit": null,
        "name": "Plaid Savings",
        "number": "9606"
      },
      "numbers": null,
      "type": "depository",
      "subtype": "savings",
      "id": null,
      "item": null,
      "user": null,
      "institutionType": null
    },
    {
      "balance": {
        "available": 9930,
        "current": 2275.58
      },
      "meta": {
        "limit": 12500,
        "name": "Plaid Credit Card",
        "number": "3002"
      },
      "numbers": null,
      "type": "credit",
      "subtype": null,
      "id": null,
      "item": null,
      "user": null,
      "institutionType": null
    }
  ],
   "transactions": [
 {
      "id": "0AZ0De04KqsreDgVwM1RSRYjyd8yXxSDQ8Zxn",
      "accountId": "XARE85EJqKsjxLp6XR8ocg8VakrkXpTXmRdOo",
      "entityId": null,
      "categoryId": "21012002",
      "pendingTransactionId": null,
      "name": "ATM Withdrawal",
      "category": [
        "Transfer",
        "Withdrawal",
        "ATM"
      ],
      "amount": 200,
      "date": {
        "year": 2014,
        "era": 1,
        "dayOfMonth": 21,
        "dayOfWeek": 1,
        "dayOfYear": 202,
        "chronology": {
          "zone": {
            "fixed": true,
            "id": "UTC"
          }
        },
        "weekOfWeekyear": 30,
        "centuryOfEra": 20,
        "yearOfCentury": 14,
        "monthOfYear": 7,
        "yearOfEra": 2014,
        "weekyear": 2014,
        "fields": [
          {
            "lenient": false,
            "minimumValue": -292275054,
            "maximumValue": 292278993,
            "rangeDurationField": null,
            "leapDurationField": {
              "unitMillis": 86400000,
              "precise": true,
              "name": "days",
              "type": {
                "name": "days"
              },
              "supported": true
            },
            "durationField": {
              "precise": false,
              "unitMillis": 31556952000,
              "name": "years",
              "type": {
                "name": "years"
              },
              "supported": true
            },
            "name": "year",
            "type": {
              "rangeDurationType": null,
              "durationType": {
                "name": "years"
              },
              "name": "year"
            },
            "supported": true,
            "unitMillis": null
          },
          {
            "lenient": false,
            "minimumValue": 1,
            "maximumValue": 12,
            "rangeDurationField": {
              "precise": false,
              "unitMillis": 31556952000,
              "name": "years",
              "type": {
                "name": "years"
              },
              "supported": true
            },
            "leapDurationField": {
              "unitMillis": 86400000,
              "precise": true,
              "name": "days",
              "type": {
                "name": "days"
              },
              "supported": true
            },
            "durationField": {
              "precise": false,
              "unitMillis": 2629746000,
              "name": "months",
              "type": {
                "name": "months"
              },
              "supported": true
            },
            "name": "monthOfYear",
            "type": {
              "rangeDurationType": {
                "name": "years"
              },
              "durationType": {
                "name": "months"
              },
              "name": "monthOfYear"
            },
            "supported": true,
            "unitMillis": null
          },
          {
            "lenient": false,
            "minimumValue": 1,
            "maximumValue": 31,
            "rangeDurationField": {
              "precise": false,
              "unitMillis": 2629746000,
              "name": "months",
              "type": {
                "name": "months"
              },
              "supported": true
            },
            "leapDurationField": null,
            "durationField": {
              "precise": true,
              "unitMillis": 86400000,
              "name": "days",
              "type": {
                "name": "days"
              },
              "supported": true
            },
            "name": "dayOfMonth",
            "type": {
              "rangeDurationType": {
                "name": "months"
              },
              "durationType": {
                "name": "days"
              },
              "name": "dayOfMonth"
            },
            "supported": true,
            "unitMillis": 86400000
          }
        ],
        "values": [
          2014,
          7,
          21
        ],
        "fieldTypes": [
          {
            "rangeDurationType": null,
            "durationType": {
              "name": "years"
            },
            "name": "year"
          },
          {
            "rangeDurationType": {
              "name": "years"
            },
            "durationType": {
              "name": "months"
            },
            "name": "monthOfYear"
          },
          {
            "rangeDurationType": {
              "name": "months"
            },
            "durationType": {
              "name": "days"
            },
            "name": "dayOfMonth"
          }
        ]
      },
      "type": {
        "primary": "special"
      },
      "score": {
        "master": null,
        "detail": null
      },
      "meta": {
        "location": {
          "coordinates": null,
          "zip": null,
          "state": "CA",
          "city": "San Francisco",
          "address": null
        },
        "contact": null,
        "ids": null
      },
      "pending": false
    },
    ]
}
   
  },
  "status": "success"
}
```
