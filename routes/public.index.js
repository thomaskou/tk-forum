const express = require('express');
const router = express.Router();
module.exports = router;

const User = require('../models/public.user');


//Middleware

router.use(function(req, res, next) {
    console.log("Online request made with type " + req.method + " at time " + Date.now());
    next();
});


//Users

router.get('/user/:name', function(req, res) {
    User.renderPage(req.params.name, res);
});
router.get('/register', function(req, res) {
    var name = req.query.name;
    var email = req.query.email;
    var pass = req.query.pass;
    var confirm = req.query.confirm;
    if (typeof name === 'undefined' || typeof email === 'undefined' || typeof pass === 'undefined' || pass != confirm) {
        User.register(res);
    } else {
        User.newUser(name, email, pass, res);
    }
});


//Posts