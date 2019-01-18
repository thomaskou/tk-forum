const Post = require('../models/post');

//Gets a JSON with a list of information regarding all posts.
exports.post_all = function(req, res) {
    Post.getAll(res);
};

//Adds a new post to the database with automatic ID generation.
//Usage: body:title, body:body, body:userid
exports.post_new = function(req, res) {
    Post.newPost(req.body.title, req.body.body, req.body.userid, res);
};

//Gets a JSON with a post's information (finds using ID).
//Usage: params:id
exports.post_get = function(req, res) {
    Post.getInfo(req.params.id, res);
};

//Edits a post's information (finds using ID).
//Usage: params:id, body:body
exports.post_edit = function(req, res) {
    Post.editPost(req.params.id, req.body.body, res);
};

//Deletes a post from the database (finds using ID).
//Usage: params:id
exports.post_delete = function(req, res) {
    Post.deletePost(req.params.id, res);
};