const db = require('../database');

var User = {};

User.newUser = function(name, email, pass) {
    db.query("SELECT COUNT(*) AS count FROM users", function(err, result) {
        if (err) throw err;
        var id = result[0].count;
        db.query("SELECT SHA2('"+pass+"', 512) AS sha", function(err, result) {
            if (err) throw err;
            var pass_sha512 = result[0].sha;
            var sql = "INSERT INTO users VALUES ('"+id+"','"+name+"','"+email+"', '"+pass_sha512+"')";
            db.query(sql, function(err, result) {
                if (err) throw err;
                console.log("Successfully added 1 user to database.");
            });
        })
    });
};

User.getInfo = function(name) {
    var sql = "SELECT * FROM users WHERE name = '"+name+"'";
    db.query(sql, function(err, result) {
        if (err) throw err;
        console.log(result);
    });
};

module.exports = User;