var express= require("express");
var bodyParser= require("body-parser");
var cookieParser= require("cookie-parser");
var mysql= require("mysql");
var session= require("express-session");
var Flutterwave= require("flutterwave");
var gibberish= require("gibberish-aes/dist/gibberish-aes-1.0.0.js");
var app= express();
var homeRouter= express.Router();

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
app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).send(err);
});
homeRouter.get("/", function(request, response){
    if(request.query.thankyou){
        response.sendfile("./thankyou.html");
    }
    else{
        request.session.initialize="Hello";
        console.log(request.session.initialize);
        console.log(connection._protocol._config);
        response.sendfile("./productDetails.html");
    }
});

console.log('We are live!!!!');