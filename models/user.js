const db = require('../database');

var User = {};

User.getInfo = function(name, res) {
    var sql = "SELECT * FROM users WHERE name = '"+name+"'";
    db.query(sql, function(err, result) {
        if (err) throw err;
        //console.log(result[0]);
        res.send(result[0]);
    });
    res.end();
};

User.newUser = function(name, email, pass, res) {
    db.query("SELECT COUNT(*) AS count FROM users", function(err, result) {
        if (err) throw err;
        var id = result[0].count;
        db.query("SELECT SHA2('"+pass+"', 512) AS sha", function(err, result) {
            if (err) throw err;
            var pass_sha512 = result[0].sha;
            var sql = "INSERT INTO users VALUES ('"+id+"','"+name+"','"+email+"','"+pass_sha512+"')";
            db.query(sql, function(err, result) {
                if (err) throw err;
                res.send("Successfully added 1 user to database.")
                //console.log("Successfully added 1 user to database.");
            });
        })
    });
    res.end();
};

User.updateUser = function(name, email, pass, res) {
    if (typeof name !== 'undefined') {
        /*
        var sql = "UPDATE users SET name = '"+name+"' WHERE name = '"+name+"'";
        db.query(sql, function(err, result) {
            if (err) throw err;
            console.log("Successfully updated one username.");
        });
        */
        if (typeof email !== 'undefined') {
            var sql = "UPDATE users SET email = '"+email+"' WHERE name = '"+name+"'";
            db.query(sql, function(err, result) {
                if (err) throw err;
                res.send("Successfully updated one email.");
                //console.log("Successfully updated one email.");
            });
        }
        if (typeof pass !== 'undefined') {
            db.query("SELECT SHA2('"+pass+"', 512) AS sha", function(err, result) {
                if (err) throw err;
                var pass_sha512 = result[0].sha;
                var sql = "UPDATE users SET pass_sha512 = '"+pass_sha512+"' WHERE name = '"+name+"'";
                db.query(sql, function(err, result) {
                    if (err) throw err;
                    res.send("Successfully updated one password.");
                    //console.log("Successfully updated one password.");
                });
            })
        }
    }
    res.end();
};

User.deleteUser = function(name, res) {
    var sql = "DELETE FROM users WHERE name = '"+name+"'";
    db.query(sql, function(err, result) {
        if (err) throw err;
        res.send("Successfully deleted one user.");
        //console.log("Successfully deleted one user.");
    });
    res.end();
}

User.getAll = function(res) {
    var sql = "SELECT * FROM users";
    db.query(sql, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
    res.end();
}

module.exports = User;