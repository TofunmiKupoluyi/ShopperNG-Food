var express= require("express");
var bodyParser= require("body-parser");
var cookieParser= require("cookie-parser");
var mysql= require("mysql");
var session= require("express-session");
var Flutterwave= require("flutterwave");
var gibberish= require("gibberish-aes/dist/gibberish-aes-1.0.0.js");
var app= express();
var homeRouter= express.Router();
var signupRouter= express.Router();
var loginRouter= express.Router();
var cartRouter=express.Router();
var checkoutRouter= express.Router();
var paymentRouter= express.Router();
var logoutRouter= express.Router();
var thankYouRouter= express.Router();
var productPageRouter= express.Router();
var productRouter= express.Router();
var connection= mysql.createConnection({
    host:process.env.MYSQL_HOST || "localhost",
    user:process.env.MYSQL_USERNAME|| "root",
    password:process.env.MYSQL_PASSWORD||"",
    database:process.env.MYSQL_DB||"shopping",

});

var flutterwave= new Flutterwave("tk_9eFaO7BCLXiWhTyJRAnq", "tk_snN5ZPBHxO");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("./static"));
app.use("/nodestatic", express.static("./node_modules"));
app.use(cookieParser());
app.use(session({secret: "shhhhh"}));
app.listen(process.env.PORT || 3000);
app.use("/", homeRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/cart", cartRouter);
app.use("/checkout", checkoutRouter);
app.use("/logout", logoutRouter);
app.use("/payment", paymentRouter);
app.use("/thankyou", thankYouRouter);
app.use("/productPage", productPageRouter);
app.use("/products", productRouter);
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).send(err);
});
homeRouter.get("/", function(request, response){
    request.session.initialize="Hello";
    console.log(request.session.initialize);
    console.log(connection._protocol._config);
    response.sendfile("./");
});
homeRouter.get("/cat/phonestab", function(request, response){
    var data={
        error:1,
        items:[5],
        reply:""
    };
    connection.query("SELECT DISTINCT Product_Brands FROM products WHERE Product_Category='Phones/Tablets' ", function(error, res){
        if(error){
            data.error=1;
            data.reply="Error in code "+error;
            response.json(data);
        }
        else{
            for(var i=0; i<res.length;i++){
                data.items[i]=res[i]["Product_Brands"];
            }
            data.error=0;
            data.reply="Succesful";
            console.log(data);
            response.json(data);
        }
    });
});
homeRouter.get("/search", function(request, response){
    var data={
        error:1,
        reply:""
    };
    if(request.query.searchQuery && request.query.searchQuery!=""){
    var searchQuery=request.query.searchQuery+"%";
    connection.query("SELECT Product_Name, Product_Price, Product_Id FROM products WHERE Product_Name LIKE ? OR Product_Brands LIKE ?", [searchQuery, searchQuery], function(error, res){
        if(error){
            data.error=1;
            data.reply="Error in code";
            response.json(data);
        }
        else{
            data.error=0;
            data.reply=res;
            response.json(data);
        }
    
    });
    }
    else{
        data.error=0;
        data.reply=[];
        response.json(data);
    }
});
homeRouter.get("/snippet/PhonesTablets", function(request, response){
    var data={
        error:1,
        names:[],
        prices:[],
        ids:[],
        sellerIds:[],
        reply:""
    }
    connection.query("SELECT Product_Id, Product_Name, Product_Price, Seller_ID FROM products WHERE Product_Category='Phones/Tablets'", function(error, res){
        if(error){
            data.error=1;
            data.reply="Error "+error;
            response.json(data);
        }
        else{
            data.error=1;
            for(var i=0; i<res.length;i++){
                data.names[i]=res[i]["Product_Name"];
                data.prices[i]= res[i]["Product_Price"];
            }
            data.reply="Successful";
            response.json(data);
        }
    });
});
homeRouter.get("/snippet/HomeAppliances", function(request, response){
    var data={
        error:1,
        names:[],
        prices:[],
        ids:[],
        sellerIds:[],
        reply:""
    }
    connection.query("SELECT Product_Id, Product_Name, Product_Price, Seller_ID FROM products WHERE Product_Category='Home Appliances'", function(error, res){
        if(error){
            data.error=1;
            data.reply="Error "+error;
            response.json(data);
        }
        else{
            data.error=1;
            for(var i=0; i<res.length;i++){
                data.names[i]=res[i]["Product_Name"];
                data.prices[i]= res[i]["Product_Price"];
            }
            data.reply="Successful";
            response.json(data);
        }
    });
});
homeRouter.get("/featuredContent", function(request, response){
    var data={
        error:1,
        reply:"",
        names:[],
        prices:[],
        ids:[],
        sellerIds:[]
    }
    connection.query("SELECT Product_Id, Product_Name, Product_Price, Seller_ID FROM products WHERE featured=1", function(error, res){
        if(error){
            data.error=1;
            data.reply="Error in code";
            response.json(data);
        }
        else{
            data.error=0;
            data.reply="Succesful";
            for(var i=0; i<res.length;i++){
                data.names[i]= res[i]["Product_Name"];
                data.prices[i]= res[i]["Product_Price"];
                data.ids[i]= res[i]["Product_Id"];
                data.sellerIds[i]= res[i]["Seller_ID"];
            }
            response.json(data);
        }
    });
});
homeRouter.get("/cat/homeapp", function(request, response){
    var data={
        error:1,
        items:[5],
        reply:""
    };
    connection.query("SELECT DISTINCT Product_Brands FROM products WHERE Product_Category='Home Appliances' ", function(error, res){
        if(error){
            data.error=1;
            data.reply="Error in code "+error;
            response.json(data);
        }
        else{
            for(var i=0; i<res.length;i++){
                data.items[i]=res[i]["Product_Brands"];
            }
            data.error=0;
            data.reply="Succesful";
            console.log(data);
            response.json(data);
        }
    });
});
homeRouter.get("/category", function(request, response){
    var category= request.query.category;
    var data= {
        error:1,
        results:""
    };
    connection.query("SELECT Product_Id, Product_Name, Seller_ID, Product_Price, Product_Brands FROM products WHERE Product_Category =? ", [category], function(error, res){
        if(error){
            data.error=1;
            data.results="There is an error in code "+error;
        }
        else{
            if(res.length>0){
                data.error=0;
                data.results=res;
                console.log(res);
                response.json(data);
            }
            else{
                data.error=1;
                data.results="404- Page Not Found";
                response.json(data);
            }
        }
    });
});

homeRouter.get("/phonestablets", function(request, response){
    response.sendfile("./phonestab.html");
});

signupRouter.post("/", function(request, response){
    var firstName= request.body.firstName;
    var lastName= request.body.lastName;
    var email= request.body.email;
    var password= request.body.password;
    var data={
        error:1,
        reply:""
    };
    connection.query("SELECT * FROM customers WHERE email=?",[email], function(err, res){
        if(res.length==0){
            if(password && !(password.length>8 && /[A-Z]/.test(password)&&/[0-9]/.test(password))){
                data.error=1;
                data.reply="Password must contain an uppercase letter and a number";
                response.json(data);
            }
             else{      
            connection.query("INSERT INTO customers(Customer_First_Name, Customer_Last_Name, Email, Password) VALUES(?, ?, ?, ?)", [firstName, lastName, email, password], function(err1, res1){
                if(err1){
                    data.error=1;
                    data.reply="Error inputting data "+err1;
                    response.json(data);
                }
                else{
                    data.error=0;
                    data.reply="Account succesfully created";
                    console.log("Account succesfully created")
                    response.json(data);
                }
            });
            }
        }
        else{
            data.error=1;
            data.reply="Account already exists with email";
            response.json(data);
        }
    });

    
});
loginRouter.get("/", function(request, response){
    console.log(request.session.itemsBought);
    if(request.session.email){
        response.sendfile("./loggedInPage.html");
    }
    else{
        response.sendfile("./login.html");
    }
});
loginRouter.post("/", function(request, response){
    var email= request.body.email;
    var password= request.body.password;
    var data={
        error:1,
        reply:"",
        CustomerID:"",
        FirstName:"",
        LastName:""
    };
    //verifiction 
    connection.query("SELECT Password, Customer_Id, Customer_First_Name, Customer_Last_Name FROM customers WHERE email=?",[email], function(err, res){
        if(err){
            data.error=1;
            data.reply="Error in code"+err;
            console.log("Error in code"+err);
            response.json(data);
        }
        else{
            if(res.length>0){
                if(res[0]["Password"]==password){
                    data.error=0;
                    data.reply="Login successful";
                    loginState=data.loginState;
                    data.CustomerID=res[0]["Customer_Id"];
                    data.FirstName= res[0]["Customer_First_Name"];
                    data.LastName= res[0]["Customer_Last_Name"];
                    request.session.customerRefNo=res[0]["Customer_Id"];
                    console.log("Login successful, Customer: "+request.session.customerRefNo);
                    request.session.email=email;
                    response.json(data);
            }
                else{
                    data.error=1;
                    data.reply="Invaid Email/Password";
                    console.log("Invalid Email/Password");
                    response.json(data); 
                }
        }

        else{
            data.error=1;
            data.reply="Invalid email/password";
            console.log(res);
            response.json(data);
        }
        }
    });
});

cartRouter.get("/", function(request, response){  
    response.sendfile("./cart.html");
});

cartRouter.post("/", function(request, response){ 
    console.log('What i got: ', request.body);
   if(!request.session.itemsBought){
    request.session.itemsBought = request.body;
   }
   else{
      request.session.itemsBought = request.session.itemsBought.concat(request.body);
   }
    console.log('The new Array: ',request.session.itemsBought );
    var totalPrice=0;
    for(var i=0; i<request.session.itemsBought.length; i++){
        totalPrice+= request.session.itemsBought[i]["itemPrice"];
    }
    
    // console.log("Our Guy: ", request.session.itemsBought);
    // console.log("Our Guy: ", totalPrice);
    var cartItems={
        itemsBought: request.session.itemsBought,
        totalPrice: totalPrice
    }
    request.session.totalPrice= totalPrice;
    response.json(cartItems);
});

cartRouter.get("/cartItems", function(request, response){
    response.json({itemsBought: request.session.itemsBought,
        totalPrice: request.session.totalPrice,
    nowSet: request.session.nowSet});
    console.log(request.session.itemsBought);
    
});

cartRouter.post("/cartItems", function(request, response){
    request.session.itemsBought=request.body;
    console.log(request.session.itemsBought);
});

cartRouter.post("/cartItems/update", function(request, response){
    request.session.itemsBought= request.body;
    console.log("What I got was" +request.body);
    console.log("What items bought is "+request.session.itemsBought);
    console.log(request.session.itemsBought===request.body);
    request.session.nowSet="Now set";
    response.json({nowSet: request.session.nowSet});
});

checkoutRouter.get("/", function(request, response){
    response.sendfile("./checkout.html");
});

checkoutRouter.get("/information", function(request, response){
    var data={
        error:1,
        email: ""
    };
    if(request.session.email){
        data.error=0;
        data.email= request.session.email;
    }
    else{
        data.error=1;
        data.email= "Please Login";
    }
    response.json(data);
    
});

checkoutRouter.post("/submitInformation", function(request, response){
    var firstName= request.body.firstName;
    var lastName= request.body.lastName; 
    var email= request.body.email;
    var address1= request.body.address1;
    var address2= request.body.address2;
    var city= request.body.city;
    var country= request.body.country;
    var phone= request.body.phone;
    var password= request.body.password;
    var data={
        error:1, 
        reply:""
    };
    
    connection.query("UPDATE customers SET Customer_First_Name=?, Customer_Last_Name=?, address1=?, address2=?, city=?, country=?, customer_phone=?  WHERE email=?", [firstName, lastName, address1, address2, city, country, phone, email] , function(error, res){
        if(error){
            data.error=1;
            data.reply="Error: "+error;
            response.json(data);
        }
        else{
            data.error=0;
            data.reply="Update Succesful";
            request.session.authPayment="Authorized";
            response.json(data);
        }
    });
    
});

paymentRouter.get("/", function(request, response){
    if(request.session.authPayment){
        response.sendfile("./payment.html");
    }
    else
    {
        response.send("04- Forbidden, please log in");
    }
});

paymentRouter.post("/payCard", function(request, response){
    var cardNo= request.body.cardNo;
    var cardExpMonth= request.body.cardExpMonth;
    var cardExpYear= request.body.cardExpYear;
    var cardCvv= request.body.cvv;
    var decryptedCardNumber= gibberish.dec(cardNo, "wowejrwnrmiowerj90239jr30j2r93jj9304j9023rj903j24");
    console.log(decryptedCardNumber);
    function getTotalPrice(){
    var totalPrice=0;
    for(var i=0; i<request.session.itemsBought.length; i++){
        totalPrice+= request.session.itemsBought[i]["itemPrice"]*request.session.itemsBought[i]["itemQuantity"];
    }
    return totalPrice;
    };
    console.log("Customer ID is "+request.session.CustomerId);
    flutterwave.Card.charge({
        authmodel: "NOAUTH",
        validateoption: "SMS", 
        cardno: decryptedCardNumber,
        expirymonth: cardExpMonth,
        expiryyear: cardExpYear,
        narration: "ShopperNG",
        amount: getTotalPrice(),
        currency:"NGN",
        cvv: cardCvv, 
        custid: request.session.customerRefNo
    }, function(error, res, body){
        //Sending received data to orders table
        var date= new Date();
        var sqlDate= date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate; //Assigning Order_Date
        //Looping through items bought array and inserting each item individually
        for(var i=0; i<request.session.itemsBought.length;i++){
            connection.query("INSERT INTO orders (Order_Date, Product_Id, Seller_ID, Status, Customer_Id, Quantity) VALUES(?,?,?,?,?,?)", [sqlDate, request.session.itemsBought[i]["itemId"], request.session.itemsBought[i]["sellerId"], body.data.responsemessage, request.session.customerRefNo, request.session.itemsBought[i]["itemQuantity"]], function(error, resp){
                if(error){
                    console.log(error); //This logs any error in code
                }
                
            });
        } //end of for loop
        request.session.confirmed= "Confirmed";
        response.json({response:body.data.responsemessage}); //response is sent
    });
});
paymentRouter.post("/payAccountInitiation", function(request, response){
    var data={
        error:1,
        reply:""
    }
    var accountNumber= request.body.accountNumber;
    var decryptedAccountNumber= gibberish.dec(accountNumber, "qw9hr98yhr39uu993r29rjoiw89wud9hwsd0ifu89wjow09fwf12");
    console.log(decryptedAccountNumber);
      flutterwave.Account.initiateRecurrentPayment(decryptedAccountNumber, function(err, res, body){
        if(err){
            data.error=1;
            data.reply="There is an error in Account Payment";
            response.json(data);
        }
        else{
            if(body.data.responseCode=="0"||body.data.responseCode=="00"||body.data.responseCode=="02"){
                data.error=0;
                data.reply="Successful";
                request.session.tRef=body.data.transactionReference;
                response.json(data);
                console.log(body);
            }
            else{
                data.error=1;
                data.reply="Please insert a valid account number";
                response.json(data);
                console.log(body);
            }
            }
});
});

paymentRouter.post("/payAccount", function(request, response){
    var accountNumber= request.body.accountNumber;
    var otp= request.body.otp;
    var transactionReference= request.session.tRef;
    console.log(request.session);
    function getTotalPrice(){
    var totalPrice=0;
    for(var i=0; i<request.session.itemsBought.length; i++){
        totalPrice+= request.session.itemsBought[i]["itemPrice"]*request.session.itemsBought[i]["itemQuantity"];
    }
    return totalPrice;
    };
    var data={
        error:1,
        reply:""
    }
    flutterwave.Account.validateRecurrentAccount({
        accountNumber: accountNumber,
        otp: otp,
        reference: transactionReference,
        billingamount: getTotalPrice(),
        debitnarration: "ShopperNG"

    }, function(err1, res1, body1){
        if(body1.data.responseCode=="RR"){
            data.error=1;
            data.reply="There is an error in validation";
            request.session.tRef="";
            response.json(data);
        }
        else{
            console.log(body1);
            flutterwave.Account.chargeRecurrentAccount({
                accountToken: body1.data.accountToken,
                billingamount: getTotalPrice(),
                debitnarration:"ShopperNG"
            }, function(err2, res2, body2 ){
                if(err2){
                    data.error=1;
                    data.reply="There was an error charging recurrent account";
                    response.json(data);
                }
                else{
                    data.error=0;
                    data.reply=body2.data.responsemessage;

                     //Sending received data to orders table
                    var date= new Date();
                    var sqlDate= date.getFullYear()+"/"+date.getMonth()+"/"+date.getDate; //Assigning Order_Date
                    //Looping through items bought array and inserting each item individually
                    for(var i=0; i<request.session.itemsBought.length;i++){
                        connection.query("INSERT INTO orders (Order_Date, Product_Id, Seller_ID, Status, Customer_Id, Quantity) VALUES(?,?,?,?,?,?)", [sqlDate, request.session.itemsBought[i]["itemId"], request.session.itemsBought[i]["sellerId"], "Successful", request.session.customerRefNo, request.session.itemsBought[i]["itemQuantity"]], function(error, resp){
                            if(error){
                                console.log(error); //This logs any error in code
                            }
                            
                        });
                    } //end of for loop
                    request.session.confirmed= "Confirmed";
                    response.json({response:body2.data.responsemessage}); //response is sent
                }
            });
        }

    });
});

logoutRouter.get("/", function(request, response){
if(request.session.email){
    request.session.email="";
}
response.json({response:"Logged out"});
});

thankYouRouter.get("/", function(request, response){
    if(request.session.confirmed){
        response.sendfile("./thankyou.html");
    }
    else{
        response.send("404 - Forbidden ");
    }
});
productRouter.get("/", function(request, response){
    response.sendfile("./productDetails.html");
})
productPageRouter.get("/", function(request, response){
    var productId= request.query.id;
    var responseData= {
        error:0,
        productInformation:""
    }
    connection.query("SELECT Product_Name, Product_Category, Product_Brands, Product_Price, Seller_ID FROM products WHERE Product_Id=?",[productId], function(err, res){
        if(err){
            responseData.error=1;
            responseData.productInformation="There is an error: "+err;
            response.json(responseData);
            console.log("There was an error "+err);
        }
        else{
            if(res.length>0){
                responseData.error=0;
                responseData.productInformation=res[0];
                response.json(responseData);
            }
            else{
                responseData.error=1;
                responseData.productInformation="Sorry, product is not available";
                response.json(responseData);
            }
        }
    });
});

console.log('We are live!!!!');