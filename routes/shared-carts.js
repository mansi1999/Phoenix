var express = require('express');
const sharedCart = require('../models/sharedCart');
const user = require('../models/user');
var router = express.Router();
//var mongoose = require('mongoose');

//mongoose.connect('localhost:27017/shopping');
/* GET home page. */
router.get('/', function(req, res, next) {
    var successMgs = req.flash('success')[0];
        var MongoClient = require('mongodb').MongoClient;
        var url = "mongodb://localhost:27017/";
        
        MongoClient.connect(url, function(err, db) {
          if (err) throw err;
          var dbo = db.db("shopping");
          dbo.collection("sharedCart").find({}).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            res.render('shop/shared-carts', { title: 'Your carts', sharedCart: result, successMgs: successMgs, noMessage: !successMgs });
           
          
        });
       //render renderes html file in shop naming index.hbs in body of layout.hbs and further writes other dynamic attributes in curly brackets
        //means that all attributes are defined in index.hbs and we are using it by modifying ourself       
    });
});


router.post('/create', isLoggedIn, function(req, res, next) {
    var lstParticipants = [];
    var lstProducts = [];
    lstParticipants.push(req.user);
    var sCart = new sharedCart({
        creator : req.user.email,
        cartName: req.body.name,
        lstParticipants: lstParticipants,
        lstProducts: lstProducts        
    });
        
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:27017/";
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("shopping");
        
           /* dbo.collection("sharedCart").insertOne(sCart, function(err, res) {
                if (err) throw err;
                console.log("1 document inserted", res);

            });  */
            dbo.collection("users").findOneAndUpdate({ email: req.user.email }, {$push: { lstCarts: "mansi" }}, {
                new: true
              },
                function (error, success) {
                    if (error) {
                        console.log("error ",error);
                    } else {
                        console.log("SUCCESS ",success);
                    }
                    db.close();
                });
        
        res.redirect("/shared-carts")

    });
});

module.exports = router;

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}