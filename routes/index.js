const express = require('express');
const router = express.Router();
module.exports = router;

const users = require('./users');
const database = require('./db_routes');
const tests = require('./tests');


//Middleware

router.use(function(req, res, next) {
    console.log("Request made with type " + req.method + " at time " + Date.now());
    next();
});


//Users


//Posts


//Database

router.get('/database/new', database.newdb);
router.get('/database/delete', database.dropdb);
router.get('/database/setup', database.setup);


//Tests

router.get('/test', tests.basic);