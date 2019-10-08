var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "password" //TODO: Add input, functions and queries
});

con.connect(function (err) { //connect 
    if (err) throw err;
    console.log("Connected!");
});