var app= angular.module("myapp",[]);
app.controller("orderController", function($scope){
    $scope.quantity=1;
    $scope.showDiv=true;
    $scope.onOrderClick= function(){
        $scope.showDiv=false;
    };
    $scope.onBackClick= function(){
        $scope.showDiv=true;
    }
});