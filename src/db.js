var mysql = require('mysql');

function connect() {
    let con = mysql.createConnection({
        host: "localhost",
        user: "admin",
        password: "password" //TODO: Add input, functions and queries
    });

    con.connect(function (err) { //connect 
        if (err) throw err;
        console.log("Connected!");
        return con;
    });
}

function select(table) {
    con = connect();
    con.query(`SELECT * FROM ${table}`, function (err, result, fields) {
        if (err) throw err;
        return result, fields;
    });
}