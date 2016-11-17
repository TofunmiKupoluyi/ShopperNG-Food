var express= require("express");
var bodyParser= require("body-parser");
var app= express();
var path= require("path");
var router= express.Router();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("../"));
app.use("/login", router);
app.listen(3000);
router.get("/", function(request, response){
    response.sendfile(path.resolve("../login.html"));
});
router.post("/signup", function(request, response){
    var name= request.body.name;
    var email= request.body.email;
    var password= request.body.password;

    var data={
        name:name,
        email:email,
        password: password
    };
    response.json(data);
});