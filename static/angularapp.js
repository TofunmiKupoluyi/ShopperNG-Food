var app= angular.module("myapp",[]);
var customerId="";
var customer="";
app.controller("getUsername", function($scope, $http){
    var cookieRaw= document.cookie;
    if(cookieRaw){
    var cookieSplit= cookieRaw.split(";");
    var cookieString= cookieSplit[0].split("=");
    $scope.username=cookieString[1];
    }
    else{
        $scope.login="LOGIN";
    }
});

app.controller("signupController", function($scope, $http){
    $scope.signupAction= function(){
        var queryData= {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            email: $scope.email,
            password: $scope.password
        };        
        $http.post("/signup", queryData).then(function(response){
            $scope.message= response.data.reply;
        });
    };
});
app.controller("loginController", function($scope, $http){
    $scope.loginAction=function(){
        var queryData={
            email: $scope.email,
            password: $scope.password
        };
        $http.post("/login", queryData).then(function(response){
            $scope.message= response.data.reply;
            if(response.data.error==0){
                window.location="./";
            }
            else{
                $scope.email="";
                $scope.password="";
            }
        });
    };
});

app.controller("toggleController", function($scope){
    $scope.showDiv=false;
});
app.controller("togglePhonesTablets", function($scope, $http){
    $scope.showDiv=false;
    $http.get("cat/phonestab").then(function(response){
        $scope.itemPhonesTablets1=response.data.items[0];
        $scope.itemPhonesTablets2=response.data.items[1];
        $scope.itemPhonesTablets3=response.data.items[2];
        $scope.itemPhonesTablets4=response.data.items[3];
        $scope.itemPhonesTablets5=response.data.items[4];
    });
});

app.controller("toggleHomeAppliances", function($scope, $http){
    $scope.showDiv=false;
    $http.get("cat/homeapp").then(function(response){
        $scope.itemHomeAppliances1=response.data.items[0];
        $scope.itemHomeAppliances2=response.data.items[1];
        $scope.itemHomeAppliances3=response.data.items[2];
        $scope.itemHomeAppliances4=response.data.items[3];
        $scope.itemHomeAppliances5=response.data.items[4];
    });
});

app.controller("featuredContentController", function($scope, $http){
    $http.get("/featuredContent").then(function(response){
        $scope.featuredPrice1= response.data.prices[0];
        $scope.featuredProduct1= response.data.names[0];
        $scope.featuredId1= response.data.ids[0];
        $scope.featuredSellerId1= response.data.sellerIds[0];
        $scope.featuredPrice2= response.data.prices[1];
        $scope.featuredProduct2= response.data.names[1];
        $scope.featuredId2= response.data.ids[1];
        $scope.featuredSellerId2= response.data.sellerIds[1];
        $scope.featuredPrice3= response.data.prices[2];
        $scope.featuredProduct3= response.data.names[2];
        $scope.featuredId3= response.data.ids[2];
        $scope.featuredSellerId3= response.data.sellerIds[2];
        $scope.featuredPrice4= response.data.prices[3];
        $scope.featuredProduct4= response.data.names[3];
        $scope.featuredId4= response.data.ids[3];
        $scope.featuredSellerId4= response.data.sellerIds[3];
        $scope.featuredPrice5= response.data.prices[4];
        $scope.featuredProduct5= response.data.names[4];
        $scope.featuredId5= response.data.ids[4];
        $scope.featuredSellerId5= response.data.sellerIds[4];
        $scope.featuredPrice6= response.data.prices[5];
        $scope.featuredProduct6= response.data.names[5];
        $scope.featuredId6= response.data.ids[5];
        $scope.featuredSellerId6= response.data.sellerIds[5];
    });
});

app.controller("searchController", function($scope, $http){
    $scope.boxShowed=false;
    $scope.searchResponse=[];
    $scope.search= function(){
        var searchQuery= $scope.searchQuery;
        $http.get("/search?searchQuery="+searchQuery).then(function(response){
            console.log(response);
            $scope.searchResponse= response.data.reply.slice(0,5);
        });
    }
});

app.controller("snippetPhonesTablets", function($scope, $http){
    $scope.snippetPhonesTabletsName=[];
    $scope.snippetPhonesTabletsPrice=[];
    $scope.snippetPhonesTabletsId=[];
    $http.get("/snippet/PhonesTablets").then(function(response){
        $scope.snippetPhonesTabletsId= response.data.ids.slice(0,4);
        $scope.snippetPhonesTabletsName= response.data.names.slice(0,4);
        $scope.snippetPhonesTabletsPrice= response.data.prices.slice(0,4);
    });
});

app.controller("snippetHomeAppliances", function($scope, $http){
    $scope.snippetHomeAppliances=[];
    $scope.snippetHomeAppliances=[];
    $scope.snippetHomeAppliances=[];
    $http.get("/snippet/HomeAppliances").then(function(response){
        $scope.snippetHomeAppliancesId= response.data.ids.slice(0,4);
        $scope.snippetHomeAppliancesName= response.data.names.slice(0,4);
        $scope.snippetHomeAppliancesPrice= response.data.prices.slice(0,4);
    });

});

app.controller("loggedInPageController", function($scope, $http){
    $scope.logout= function(){
        $http.get("/logout").then(function(response){
            window.location="/login";
        });
    };
});

app.factory('CartService',function($http,$rootScope,$q){
    if(!itemsBought){
        var itemsBought = [];
    }
    var session = function(obj){
    var deferred = $q.defer();
        $http.post("/cart", obj).then(function(response){
            $rootScope.cartSession = response.data;
            console.log(response.data);
            deferred.resolve(response.data);
         });
        return deferred.promise;
    }

    return {
            onAddToCart: function(itemId, itemName, itemPrice, itemQuantity, sellerId){
            console.log('Items b: ',itemsBought);
            itemsBought=[{itemId:itemId, itemName:itemName, itemPrice:itemPrice, itemQuantity:itemQuantity, sellerId:sellerId}];
            return session(itemsBought);
        },
            onRemoveFromCart: function(itemId, itemName, itemPrice){
            itemsBought.pop();
            // ToDo: Implement remove on session API
        },

            cartSlider: function(itemName){
                return "You have added "+itemName+" to your cart";
            }


    }
});

app.controller("cartController", function($rootScope,$scope, $http, CartService){
    $rootScope.myCart=[];
    $rootScope.addToCartMessage=[];
    $rootScope.visible= false;
    $scope.cartClick= function(itemId, itemName, itemPrice, itemQuantity, sellerId){
        CartService.onAddToCart(itemId, itemName, itemPrice, itemQuantity, sellerId)
        .then(function(response){
            $rootScope.myCart= response.itemsBought;
            $rootScope.visible=true;
            $rootScope.addToCartMessage.push({id: itemId, message:"You have added "+itemName+" to your cart"});
            console.log('The response:  ', response);
            console.log('Your cart: '+$rootScope.myCart);

        })
        .catch(function(err){
            console.log('Oh! something blew: ',err);
        }); 

    };

    $scope.getCart= function(){
        var myCart= $rootScope.myCart;
        console.log(myCart);
    };
});

app.controller("cartItemsController", function($rootScope,$scope, $http){
    $http.get("/cart/cartItems").then(function(response){
        $rootScope.visited+=1;
        $scope.items= response.data.itemsBought;
        // var valueIsSet= response.data.nowSet;
        var duplicates=$scope.items;
        // for(var i=0; i<$scope.items.length; i++){
        //     for(var y=$scope.items.length-1; y>=0; y--){
        //         if($scope.items[i]["itemId"]==$scope.items[y]["itemId"]){
        //             duplicates.push($scope.items[i]);
        //         }
        //     }
        // }
        duplicates= duplicates.sort(function(a,b){return a["itemId"]-b["itemId"]});
        console.log(duplicates);
        $scope.uniqueItems=[];
        var y=0;
        for(var i=1; i<duplicates.length; i++){
            if(duplicates[i]["itemId"]!=duplicates[i-1]["itemId"]){
                $scope.uniqueItems[y]= duplicates[i-1];
                console.log(duplicates[i]);
                y+=1;
            }
        }
        $scope.uniqueItems[$scope.uniqueItems.length]=duplicates[duplicates.length-1];
        console.log($scope.uniqueItems);
        $rootScope.numberItemsBought= $scope.uniqueItems.length;
        $http.post("/cart/cartItems", $scope.uniqueItems);

        $scope.increaseQuantity= function(itemId, itemQuantity){
            console.log($scope.uniqueItems);
            function filterFunction(obj){
                return obj["itemQuantity"]!=0;
            } 
            $scope.uniqueItems= $scope.uniqueItems.filter(filterFunction);
            $http.post("/cart/cartItems/update", $scope.uniqueItems).then(function(response){
                console.log($scope.uniqueItems);
            });
        };

        // function setTotalPrice(totalPrice){
        //     $scope.totalPrice=totalPrice;
        // } --To be implemented to make total price generation automatic
        $scope.getTotalPrice= function(){
            var totalPrice=0;
            for(var i=0; i<$scope.uniqueItems.length; i++){
                totalPrice+= $scope.uniqueItems[i]["itemPrice"]*$scope.uniqueItems[i]["itemQuantity"];
            }
            // setTotalPrice(totalPrice); -- To be implemented to make total price generation automatic
            return totalPrice;
        };

    });

});

app.controller("checkoutController", function($scope, $http){
    $http.get("/checkout/information").then(function(response){
        var error= response.data.error;
        $scope.loginComplete=false;
        if(error==1){
            $scope.email="";
            $scope.message="Please login or sign up";
            $scope.passwordRequest="Password";
        }
        else{
            $scope.email=response.data.email;
            $scope.message="For added security we require you to confirm your password";
            $scope.passwordRequest="Confirm Password";
        }
    });
    $scope.login= function(){
        var sentData={
            email: $scope.email,
            password: $scope.password
        };
        $http.post("/login", sentData).then(function(response){
            $scope.message= response.data.reply;
            $scope.firstName= response.data.FirstName;
            $scope.lastName= response.data.LastName;
            if(response.data.error==1){
                $http.get("/logout").then(function(response){
                    window.location="/login";
                });
                
            }
            else{
                $scope.loginComplete=true;
                $scope.submitForm= function(){
                var customerInformation={
                    firstName: $scope.firstName,
                    lastName: $scope.lastName,
                    email: $scope.email,
                    address1: $scope.address1,
                    address2: $scope.address2,
                    city: $scope.city,
                    country: $scope.country,
                    phone: $scope.phone,
                    password: $scope.password 
                };
                $http.post("/checkout/submitInformation", customerInformation).then(function(response){
                    console.log(response.data.reply);
                    window.location="/payment";
                });
                };
            }
        });
    };
});

app.controller("paymentController", function($scope, $http){
    $scope.buyCard= function(){
        $scope.message="Please Wait ...";
        var encryptedCardNumber=GibberishAES.enc($scope.cardNo, "wowejrwnrmiowerj90239jr30j2r93jj9304j9023rj903j24");

        var cardDetails={
            cardNo: encryptedCardNumber,
            cardExpMonth: $scope.cardExpMonth,
            cardExpYear: $scope.cardExpYear,
            cvv: $scope.cardCvv
        };
        $http.post("/payment/payCard", cardDetails).then(function(response){
            console.log(response);
            window.location="/thankyou";
        });
    };
    $scope.showDiv= false;
    $scope.message="";
    $scope.buyAccountInitiation= function(){
        var encryptedAccountNumber= GibberishAES.enc($scope.accountNumber, "qw9hr98yhr39uu993r29rjoiw89wud9hwsd0ifu89wjow09fwf12");
        var accountDetails={
            accountNumber: encryptedAccountNumber,
        };
        $http.post("/payment/payAccountInitiation", accountDetails).then(function(response){
            console.log(response);
            if(response.data.error==0){
                $scope.showDiv= true;
            }
            else{
                $scope.message=response.data.reply;
            }
        });

    };
    $scope.chargeAccount= function(){
        $scope.message="Please Wait ...";
        var encryptedAccountNumber= GibberishAES.enc($scope.accountNumber, "qw9hr98yhr39uu993r29rjoiw89wud9hwsd0ifu89wjow09fwf12");
        var accountDetails={
            accountNumber: encryptedAccountNumber,
            otp: $scope.otp
        };
        $http.post("/payment/payAccount", accountDetails).then(function(response){
            if(response.data.error==0){
                console.log(response);
                $scope.message= response.data.reply;
                console.log(response.data);
                window.location="/thankyou";

            }
            else{
                $scope.showDiv=false;
                $scope.message="Please retry, an error occurred";
                console.log(response.data);
            }

        });
    };
});

app.controller("phonestabletsController", function($scope, $http){
    $http.get("/category?category=Phones/Tablets").then(function(response){
        $scope.items= response.data.results;
    });
});

app.controller("gibberishTest", function($scope, $http){
    $scope.sendTest= function(){
        var enc=  GibberishAES.enc($scope.password, "Password1234564567890-0987yuiuhygtfr");
        var data={
            password: enc
        };
        $http.get("/gibberishTest?password="+enc).then(function(response){
            console.log(response.data.password);
        });
    };
});
app.factory("ProductPageService", function($scope, $http){
    return {
        itemProductClick: function(productId){
            $http.get("productPage?id="+productId).then(function(response){
                console.log(response.data.productInformation);
            });
        }
    }
});
app.controller("productPage", function($scope, $http, ProductPageService){
    $scope.visitPageClick= function(id){
        $http.get("productPage?id="+id).then(function(response){
            console.log(response.data);
        });
        window.location="/products"
    };
    
});