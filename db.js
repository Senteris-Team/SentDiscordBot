var mysql = require('mysql');

var DBpassword = "add input";//TODO: Add input, functions and queries

function connect() {
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

// CopyPaste))
// DON'T USE THESE FUNCTIONS! NOWAY!
function select(table) {
    let connection = connect();
    connection.query(`SELECT * FROM ${table}`, function (err, result, fields) {
        if (err) throw err;
        endConnect(connection);
        return result, fields;
    });
}

function insert(table, column, value) {
    let columns;
    if( Object.prototype.toString.call( column ) === '[object Array]' ) { // if column == array => columns = "column1, column2..."
        for (i = 0; i != column.length; i++) {
            columns += column[i] + ", ";
        } columns += column [-0]; // columns = "... column5, column6 (w/o ',')"
    } else { columns = column; } // else columns == column

    let values;
    if( Object.prototype.toString.call( value ) === '[object Array]' ) { //Same
        for (i = 0; i != value.length; i++) {
            values += value[i] + ", ";
        } values += value [-0];
    } else { values = value; }

    let connection = connect();
    connection.query(`INSERT INTO ${table} (${columns}) values (${values})`, function (err, result, fields) {
        if (err) throw err;
        endConnect(connection);
    });
}

function Update(table, column, value) {
    let updateString;
    if( Object.prototype.toString.call( column ) === '[object Array]' ) {
        for (i = 0; i != column.length; i++) {
            updateString += column[i]+"="+value[i]+", ";
        } updateString += column[-0]+"="+value[-0];
    } else updateString += column+"="+value;

    let connection = connect();
    connection.query(`UPDATE ${table} SET ${updateString}`, function (err, result, fields) {
        if (err) throw err;
        endConnect(connection);
    });
}