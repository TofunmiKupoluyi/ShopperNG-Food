# Flutterwave Nodejs API Library v1.0.0

## Flutterwave Services exposed by the library

- Account Payment
- BIN Check
- BVN Check
- Card Charge
- Disbursement
- IP Check
- List of banks and financial institutions

For more information on the services listed above, visit the [Flutterwave DEV website](http://www.flutterwave.com/#/api?_k=iqvjlk)

## How to use

`npm install flutterwave`


 You can get your MERCHANT_KEY and API_KEY from the dev dashboard. Go [here](https://www.flutterwavedev.com/signup/) if you don't have an account.

 
```
var Flutterwave = require('flutterwave');

var flutterwave = new Flutterwave(API_KEY, MERCHANT_KEY);
/*
To call a flutterwave class (Code-name for API endpoint group) do :
flutterwave.Class.method(param1..paramn, callback);
*/

flutterwave.IP.check('127.0.0.1', function(error, response, body){
	//do stuff with response
})
```

### Callbacks and handling API response

The callback (usually the last argument passed to any of the method calls) takes three parameters:

* `error` : This is usually null unless an error occured.

* `response` : [`http.IncomingMessage`](http://nodejs.org/api/http.html#http_class_http_clientrequest) object. 

* `body` : the response body, [JSend-compliant](https://labs.omniti.com/labs/jsend) ,usually a JSON object in the form:
```
{
	"status" : "success|error",
	"data" : "OBJECT | error message"
}
```

Note that calls to the flutterwave API sometimes return with a successful status even when the request failed. Please check the returned data object and see the responseCode property. Values `0`, `00`, `02` indicate your request was successful. Any other value indicates failure, check the responseMessage to get the failure reason. While a responseCode of `02` indicates a successful request, it also means you need to make a subsequent validation call using information returned from the previous request. To make things a tad simpler, the `response` object has been mutated to include two boolean properties:

* `response.flutterwaveRequestSuccessful` - If true, means the request was 'truly' successful 

* `response.flutterwaveRequestRequiresValidation` - Usually true when the responseCode is `02`

As a rule of thumb, always put your flutterwave calls in a try block. The library throws errors whenever:
* Required params are not passed
* Values are empty
* Values are not in the expected format
_See the [example](https://github.com/Flutterwave/flutterwave-node/tree/master/examples) directory for more usage information_