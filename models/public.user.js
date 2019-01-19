const db = require('../database');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const options = {
    resources: 'usable',
    runScripts: 'dangerously',
};

var User = {};

User.renderPage = function(name, res) {
    var sql = "SELECT * FROM users WHERE name = '"+name+"'";
    db.query(sql, function(err, result) {
        if (err) throw err;
        JSDOM.fromFile("./views/user.html", options).then(dom => {
            dom.window.document.getElementById("username").innerHTML = result[0].name;
            dom.window.document.getElementById("email").innerHTML = result[0].email;
            res.send(dom.serialize());
        }).catch(function(rej) {
            console.log(rej);
        });
    });
};

User.register = function(res) {
    JSDOM.fromFile("./views/register.html", options).then(dom => {
        res.send(dom.serialize());
    }).catch(function(rej) {
        console.log(rej);
    });
};

User.newUser = function(name, email, pass, res) {
    db.query("SELECT COUNT(*) AS count FROM users", function(err, result) {
        if (err) throw err;
        var id = result[0].count;
        db.query("SELECT SHA2('"+pass+"', 512) AS sha", function(err, result) {
            if (err) throw err;
            var pass_sha512 = result[0].sha;
            var sql = "INSERT INTO users VALUES ("+id+",'"+name+"','"+email+"','"+pass_sha512+"')";
            db.query(sql, function(err, result) {
                if (err) throw err;
                res.send("Successfully registered!")
            });
        })
    });
}

module.exports = User;