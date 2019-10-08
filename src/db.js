var mysql = require('mysql');

var DBpassword = "add input";//TODO: Add input, functions and queries

function connect() { // Don't hit me pls
    let connection = mysql.createConnection({
        host: "localhost",
        user: "admin",
        password: DBpassword
    });

    connection.connect(function (err) { //connect 
        if (err) throw err; // Throw error in case error.. WOW this is genius! Nobody could not think about it!
        console.log("Connected to the database! YEAH! WE DID IT!");
        return connection;
    });
}

function endConnect(connection) { // stop... IT'S END CONNECTION?! FOR WHAT?!
    connection.end(function (err) {
        if (err) throw err;
        console.log("A connection is closed:)");
    });
}

function select(table) {
    let connection = connect();
    connection.query(`SELECT * FROM ${table}`, function (err, result, fields) {
        if (err) throw err;
        endConnect(connection);
        return result, fields;
    });
}

function insert(table, column, value) {
    let connection = connect();
    connection.query(`INSERT INTO ${table} (${column}) values (${value})`, function (err, result, fields) {
        if (err) throw err;
        endConnect(connection);
    });
}