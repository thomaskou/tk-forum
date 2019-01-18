const User = require('../models/user');

exports.user_all = function(req, res) {
    res.send("NOT IMPLEMENTED: GET /api/users");
};

exports.user_new = function(req, res) {
    User.newUser(req.body.user, req.body.email, req.body.pass);
    res.end();
};

exports.user_get = function(req, res) {
    User.getInfo(req.params.name);
    res.end();
};

exports.user_update = function(req, res) {
    res.send("NOT IMPLEMENTED: PUT /api/users/:id");
};

exports.user_delete = function(req, res) {
    res.send("NOT IMPLEMENTED: DELETE /api/users/:id");
};