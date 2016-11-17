var app= angular.module("login", []);
app.controller("signupController", function($scope, $http){
    submitAction= function(){
        var name= $scope.name;
        var email= $scope.email;
        var password= $scope.password;
        $scope.message= "HEllo";
        var signupData={
            name:name,
            email:email,
            password:password
        }
        $http.post("/login/signup", signupData).then(function(response){
            
        });
    }
});