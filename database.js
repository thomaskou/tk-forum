const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "pass",
    database: "forumdb"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to MySQL database.");
})

module.exports = con;