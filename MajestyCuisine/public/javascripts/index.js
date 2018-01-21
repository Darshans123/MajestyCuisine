var module = angular.module("Majestys", ["ui.router", "ngResource"]);
module.config(
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/Home");
        $stateProvider.state(
            "Home", {
                url: "/Home",
                views: {
                    main: {
                        templateUrl: "pages/home.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Appetizer", {
                url: "/Appetizer",
                views: {
                    main: {
                        templateUrl: "pages/appetizer.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Entree", {
                url: "/Entree",
                views: {
                    main: {
                        templateUrl: "pages/entree.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Drinks", {
                url: "/Drinks",
                views: {
                    main: {
                        templateUrl: "pages/drinks.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Dessert", {
                url: "/Dessert",
                views: {
                    main: {
                        templateUrl: "pages/dessert.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Gallery", {
                url: "/Gallery",
                views: {
                    main: {
                        templateUrl: "pages/gallery.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "ReserveTable", {
                url: "/ReserveTable",
                views: {
                    main: {
                        templateUrl: "pages/tableReservation.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Reviews", {
                url: "/Reviews",
                views: {
                    main: {
                        templateUrl: "pages/reviews.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Newuser", {
                url: "/Newuser",
                views: {
                    main: {
                        templateUrl: "pages/newuser.html"
                    }
                }
            }
        );
        $stateProvider.state(
            "Cart", {
                url: "/Cart",
                views: {
                    main: {
                        templateUrl: "pages/cart.html"
                    }
                }
            }
        );
    });

module.controller("newuser", function ($scope, $resource) {
    $scope.save = function () {
        var request = $resource("/users/add");
        request.save(
            {
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                emailid: $scope.emailid,
                password: $scope.password,
                phoneno: $scope.phoneno,
                address: $scope.address,
                zipcode: $scope.zipcode
            }, function (response) {
                if (response.error) {
                    $scope.message = response.error;
                }
                else {
                    $scope.message = "User has been successfully added.";
                    $scope.firstname = "";
                    $scope.lastname = "";
                    $scope.emailid = "";
                    $scope.password = "";
                    $scope.phoneno = "";
                    $scope.address = "";
                    $scope.zipcode = "";
                }
            });
        var $logoutScope = angular.element(document.getElementById("LogoutUser")).scope();
        $logoutScope.message = "";
    }
});

/*Existing user login.... Darshan*/
module.controller("LoginUsers", function ($scope, $resource) {
    $resource("/users/currentUser").get(function (response) {
        if (response.emailid) {
            $scope.message = "Login as: " + response.emailid
        }
    }
    );
    $scope.save = function () {
        var request = $resource("/users/login");
        request.save(
            {
                emailid: $scope.emailid,
                password: $scope.password,
            },
            function (response) {
                if (response.error == "Unsuccessful login") {
                    $scope.message = "Username or Password Incorrect."
                }
                else {
                    $scope.loggedin = true;
                    $scope.message = response.error;
                    $scope.emailid = "";
                    $scope.password = "";
                    $scope.firstname = response.user;
                }
                var $logoutScope = angular.element(document.getElementById("LogoutUser")).scope();
                $logoutScope.message = "";
                location.reload();
            }

        );
    }
});

//module.controller("username", function ($scope, $http) {

//    $http.get("/users/username").then(function (data) {
//        $scope.message = data.data;
//        });
//});


//module.controller("logout", function ($scope, $http) {
//        $http.get("/users/logout").then(function (data) {
//            $scope.logoutmessage = data.data;
//        });

//});
//module.controller("logout", function ($scope, $http) {
//    $scope.logout = function () {
//        debugger;
//        var get = $http.get("/users/logout");
//        get.then(function (response) {
//            $scope.logoutmessage = response.data;
//        });
//    }
//});
//module.controller("logout", function ($scope, $http) {
//    $scope.logout = function () {
//        var request = $http("/users/logout");
//        request.save(function (response) {
//            $scope.logoutmessage = response.error;
//        });
//    }
//});
module.controller("logout", function ($scope, $resource) {
    $scope.logout = function () {
        var request = $resource('/users/logout');
        request.save(
            function (response) {
                $scope.message = response.error;
                var $loginScope = angular.element(document.getElementById("LoginUser")).scope();
                $loginScope.message = "";
                location.reload();
            }
        );
    }
});

module.controller("appetizerItems", function ($scope, $resource) {

    var request = $resource("/users/appetizer");
    request.query(function (data) {
        $scope.appetizers = data;
    });

    $scope.addToCart = function (item, quantity) {
        var request = $resource("/users/orders");
        if (quantity == null) {
            quantity = 1;
        }
        var totalPrice = Math.round(100 * (quantity * item.Price)) / 100;
        request.save(
            {
                foodId: item.FoodId,
                foodName: item.Name,
                imageUrl: item.ImageUrl,
                price: item.Price,
                quantity: quantity,
                totalPrice: totalPrice
            }, function (response) {
                $scope.message = response.error;
            });
    }
});

module.controller("entreeItems", function ($scope, $resource) {

    var request = $resource("/users/entree");
    request.query(function (data) {
        $scope.entrees = data;
    });

    $scope.addToCart = function (item, quantity) {
        var request = $resource("/users/orders");
        if (quantity == null) {
            quantity = 1;
        }
        var totalPrice = Math.round(100 * (quantity * item.Price)) / 100;
        request.save(
            {
                foodId: item.FoodId,
                foodName: item.Name,
                imageUrl: item.ImageUrl,
                price: item.Price,
                quantity: quantity,
                totalPrice: totalPrice
            }, function (response) {
                $scope.message = response.error;
            });
    }
});

module.controller("drinkItems", function ($scope, $resource) {

    var request = $resource("/users/drinks");
    request.query(function (data) {
        $scope.drinks = data;
    });
    
    $scope.addToCart = function (item,quantity) {
        debugger;
        var request = $resource("/users/orders");
        if (quantity == null) {
            quantity = 1;
        }
        var totalPrice = Math.round(100 * (quantity * item.Price)) / 100;
        request.save(
            {
                foodId: item.FoodId,
                foodName: item.Name,
                imageUrl: item.ImageUrl,
                price: item.Price,
                quantity: quantity,
                totalPrice: totalPrice
            }, function (response) {
                $scope.message = response.error;
            });
    }
});

module.controller("dessertItems", function ($scope, $resource) {

    var request = $resource("/users/dessert");
    request.query(function (data) {
        $scope.desserts = data;
    });

    $scope.addToCart = function (item,quantity) {
        var request = $resource("/users/orders");
        if (quantity == null) {
            quantity = 1;
        }
        var totalPrice = Math.round(100 * (quantity * item.Price)) / 100;
        request.save(
            {
                foodId: item.FoodId,
                foodName: item.Name,
                imageUrl: item.ImageUrl,
                price: item.Price,
                quantity: quantity,
                totalPrice: totalPrice
            }, function (response) {
                $scope.message = response.error;
            });
    }
});

module.controller("tableReservation", function ($scope, $resource) {
    $scope.checkAvailabilityAndReserve = function () {
        var request = $resource("/users/tablereservation");
        request.save(
            {
                people: $scope.People,
                date: ((($scope.Date).getMonth() + 1) + "/" + ($scope.Date).getDate() + "/" + ($scope.Date).getFullYear()),
                time: $scope.Time
            }, function (response) {
                if (response.error == "Not Available") {
                    $scope.message = "Please select another Date or Time slot!!!";
                } else {
                    $scope.message = "Your Table has been reserved sucessfully!!!";
                }
            });
    }
});

module.controller("cart", function ($scope, $resource) {
    var request = $resource("/users/cart");
    request.query(function (data) {
        $scope.items = data;
        var totalAmount = 0;
        for (var i = 0; i < data.length; i++) {
            totalAmount += +(data[i].totalPrice);
        }
        $scope.totalAmount = totalAmount;
        $scope.message = "Your Total Amount is: " + totalAmount;
    });

    $scope.removeItem = function (foodId) {
        var request = $resource("/users/deletefromcart");
        request.save(
            {
                foodId: foodId
            }, function (response) {
                location.reload();
            });
    }
    $scope.checkout = function (items) {
        var request = $resource("/users/checkout");
        request.save(
            {
                totalPrice: $scope.totalAmount
            }, function (response) {
                location.reload();
                alert("Your Order is complete. Enjoy your food.");
            });

    }
});

module.controller("gallery", function ($scope, $resource) {

    var request = $resource("/users/gallery");
    request.query(function (data) {
        $scope.galleries = data;
    });
});

module.controller("reviews", function ($scope, $resource, $http) {
    var request = $resource("/users/review");
    request.query(function (data) {
        $scope.reviews = data;
    });
    $http.get("/users/username").then(function (data) {
        if (data.data != "Not Logged on") {
            $scope.email = data.data;
            $scope.currentUser = true;
        } else {
            $scope.currentUser = false;
        }
    });
    $scope.submitReview = function (reviewComments) {
        var request = $resource("/users/reviewSubmit");
        request.save(
            {
                review: $scope.reviewComments
            }, function (response) {
                alert("Review is submitted");
                $scope.reviewComments = "";
                location.reload();
            });
    }
});
