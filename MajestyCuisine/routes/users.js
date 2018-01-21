var express = require('express');
var router = express.Router();
var fs = require("fs");
var session;
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
    res.send('respond with a resource');
});


router.post("/add", function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/customer.json', 'utf8').trim();
    var users = JSON.parse(json);
    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        emailid: req.body.emailid,
        password: req.body.password,
        phoneno: req.body.phoneno,
        address: req.body.address,
        zipcode: req.body.zipcode
    };
    users.push(user);
    fs.writeFileSync(config.dataPath + '/customer.json', JSON.stringify(users), "utf8");
    var response = {
        user: user,
        error: ""
    };
    res.end(JSON.stringify(response));
});

/*Existing user login.... Ananya*/
//router.post("/login", function (req, res) {
//    var response = {};
//    var config = require('config');
//    var users = loadUsers();

//    var user = {
//        emailID: req.body.emailid,
//        password: req.body.password
//    };

//    for (var i = 0; i < Object.keys(users).length; i++) {
//        if (users[i].emailid == user.emailID && users[i].password == user.password) {
//           // var session = req.session;
//            session = req.session;
//            session.loginAs = user.emailID;
//            session.save();
//            response = {
//                user: users[i],
//                error: "Login As :" + session.loginAs
//            };
//            break;
//        }
//        else {
//            response = {
//                error: "Unsuccessful login"
//            }
//        }
//    }
//    res.end(JSON.stringify(response));
//});

router.get('/currentUser', function (req, res) {
    var users = loadUsers();
    var username = req.session.loginAs;
    var user;
    if (username) {
        for (var i = 0; i < users.length; i++) {
            if (users[i].emailid == username) {
                user = users[i];
                break;
            }
        }
    }
    if (user) {
        delete user.password;
        res.end(JSON.stringify(user));
    }
    else {
        res.end("{}");
    }
});

router.post("/login", function (req, res) {
    var response = {};
    var config = require('config');
    var users = loadUsers();
    var session = req.session;

    var user = {
        emailID: req.body.emailid,
        password: req.body.password
    };

    for (var i = 0; i < Object.keys(users).length; i++) {
        if (users[i].emailid == user.emailID && users[i].password == user.password) {
            if (req.session.loginAs == null) {
                session.loginAs = user.emailID;
                response = {
                    user: session.loginAs,
                    error: "Successful login As : " + session.loginAs
                };
                break;
            }
            else if (req.session.loginAs == users[i].emailid) {
                response = {
                    error: "User already logged in As: " + session.loginAs
                };
                break;
            }
            else if (req.session.loginAs != users[i].emailid) {
                response = {
                    error: "Another user already logged in."
                };
                break;
            }
        }
        else {
            response = {
                error: "Unsuccessful login"
            }
        }
    }

    res.end(JSON.stringify(response));
});
//router.get("/username", function (req, res) {
//    var config = require('config');
//    res.end(req.session.loginAs ? req.session.loginAs : "Not Logged ON")
//});


//router.get("/logout", function (req, res) {
//    var config = require('config');
//    delete req.session.loginAs;
//    //req.session.destroy();
//    res.end("Logged Out.");
//});

/*Log out...Ananya*/
router.post("/logout", function (req, res) {
    var config = require('config');
    //debugger;
    var response = {};
    if (req.session.loginAs == null) {
        response = {
            error: "User not logged in."
        }
    }
    else {
        delete req.session.loginAs;
        response = {
            error: "Logged out successfully."
        }
    }
    res.end(JSON.stringify(response));
});

function loadUsers() {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/customer.json', 'utf8').trim();
    var users = JSON.parse(json);
    return users;
}

router.get("/appetizer", function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/appetizer.json', 'utf8').trim();
    var appetizers = JSON.parse(json);

    res.end(JSON.stringify(appetizers));
});

router.get("/entree", function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/entree.json', 'utf8').trim();
    var entrees = JSON.parse(json);

    res.end(JSON.stringify(entrees));
});

router.get("/drinks", function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/drinks.json', 'utf8').trim();
    var drinks = JSON.parse(json);

    res.end(JSON.stringify(drinks));
});

router.get("/dessert", function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/dessert.json', 'utf8').trim();
    var desserts = JSON.parse(json);

    res.end(JSON.stringify(desserts));
});

router.post('/tablereservation', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/tableInfo.json', 'utf8').trim();
    var tableInfo = JSON.parse(json);
    var availability = false;
    var response;
    for (var i = 0; i < tableInfo.length; i++) {
        if (!(tableInfo[i].date == req.body.date && tableInfo[i].time == req.body.time)) {
            availability = true;
        } else {
            availability = false;
            response = {
                error: "Not Available",
            };
            break;
        }
    }
    if (availability == true) {
        var newTableInfo = {
            people: req.body.people,
            date: req.body.date,
            time: req.body.time
        };
        tableInfo.push(newTableInfo);
        fs.writeFileSync(config.dataPath + '/tableInfo.json', JSON.stringify(tableInfo), "utf8");
        response = {
            newTableInfo: newTableInfo,
        };
    }
    res.end(JSON.stringify(response));
});

router.get("/gallery", function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/gallery.json', 'utf8').trim();
    var galleries = JSON.parse(json);

    res.end(JSON.stringify(galleries));
});

router.get("/review", function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/review.json', 'utf8').trim();
    var reviews = JSON.parse(json);
    res.end(JSON.stringify(reviews));
});

router.get("/username", function (req, res) {
     res.send(req.session.loginAs ? req.session.loginAs : "Not Logged on");
});

router.post("/reviewSubmit", function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/review.json', 'utf8').trim();
    var reviews = JSON.parse(json);
    var json = fs.readFileSync(config.dataPath + '/customer.json', 'utf8').trim();
    var customers = JSON.parse(json);
    var name = "";
    for (var i = 0; i < customers.length; i++) {
        if (customers[i].emailid == req.session.loginAs) {
            name = customers[i].firstname + " " + customers[i].lastname; 
        }
    }
    var review = {
        name: name,
        review: req.body.review
    };
    reviews.push(review);
    fs.writeFileSync(config.dataPath + '/review.json', JSON.stringify(reviews), "utf8");
    var response = {
        review: review,
        error: ""
    };
    res.end(JSON.stringify(response));
});

router.post('/orders', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/orders.json', 'utf8').trim();
    var orders = JSON.parse(json);
    var order = {
        user: req.session.loginAs,
        foodId: req.body.foodId,
        foodName: req.body.foodName,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice
    };
    if (req.session.loginAs == null) {
        var response = {
            error: "Please login to add food to cart."
        };}
    else {
    orders.push(order);
    fs.writeFileSync(config.dataPath + '/orders.json', JSON.stringify(orders), "utf8");
    var response = {
        order: order,
        error: ""
    };
    }
    res.end(JSON.stringify(response));
});

router.get('/cart', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/orders.json', 'utf8').trim();
    var orders = JSON.parse(json);
    var cartOrder = [];
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].user == req.session.loginAs) {
            cartOrder.push(orders[i]);
        }
    }
    res.end(JSON.stringify(cartOrder));
});

router.post('/deletefromcart', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/orders.json', 'utf8').trim();
    var orders = JSON.parse(json);
    for (var i = 0; i < orders.length; i++) {
        if (orders[i].foodId == req.body.foodId) {
            orders.splice(i, 1);
        }
    }
    fs.writeFileSync(config.dataPath + '/orders.json', JSON.stringify(orders), "utf8");
    res.end("Record deleted");
});

router.post('/checkout', function (req, res) {
    var config = require('config');
    var json = fs.readFileSync(config.dataPath + '/checkout.json', 'utf8').trim();
    var cust_json = fs.readFileSync(config.dataPath + '/customer.json', 'utf8').trim();
    var orders = JSON.parse(json);
    var customers_json = JSON.parse(cust_json);
    var cust_address;
        for (var i = 0; i < customers_json.length; i++) {
            if (customers_json[i].emailid == req.session.loginAs) {
                cust_address = customers_json[i].address;
            }
        }
        var order = {
            userName: req.session.loginAs,
            address: cust_address,
            totalPrice: req.body.totalPrice
        };

        orders.push(order);
        fs.writeFileSync(config.dataPath + '/checkout.json', JSON.stringify(orders), "utf8");
        var response = {
            order: order
        };

        var json = fs.readFileSync(config.dataPath + '/orders.json', 'utf8').trim();
        var orders = JSON.parse(json);
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].user == req.session.loginAs) {
                orders.splice(i);
            }
        }
        fs.writeFileSync(config.dataPath + '/orders.json', JSON.stringify(orders), "utf8");

   // }

    res.end(JSON.stringify(response));
});


module.exports = router;