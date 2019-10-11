var mysql = require("mysql");

var DBpassword = process.argv[3];
var pool = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: DBpassword,
  database: "Discord",
  queueLimit: 0, // unlimited queueing
  connectionLimit: 0, // unlimited connections
  multipleStatements: true, // I like this because it helps prevent nested sql statements, it can be buggy though, so be careful
  socketPath: "/var/lib/mysql/mysql.sock"
});

function connect() {
  pool.getConnection(function(err, conn) {
    if (err) return console.log(err);
    //return conn; // Xef - Why?
  });
}

function endConnect(connection) {
  // stop... IT'S END CONNECTION?! FOR WHAT?!
  connection.release(function(err) {
    if (err) throw err;
    console.log("A connection is closed:)");
  });
}

function select(table, col, value) {
  //let connection = connect(); // Xef - Why?
  pool.getConnection(function(err, conn) {
    if (err) return console.log(err);
    //return conn; // Xef - Why?
    conn.query(`SELECT * FROM ${table} WHERE ${col} = '${value}'`, function(
      err,
      result,
      fields // TODO select ${STH} from
    ) {
      if (err) throw err;
      console.log(result);
      rows.forEach(function(row) {
        console.log(row);
        var result = row;
      });
      endConnect(conn);
      var result = ["1"];
      return result;
    });
  });
}

function get_giuld_settings(guild) {
  //let settings = select("settings", "guild_id", guild.id);
  select("settings", "guild_id", guild.id);
  var settings = [];
  if (settings.length !== 0) {
    // if setting is not empty
    return settings;
  } else {
    insert("settings", "`guild_id`", guild.id); // Add the settings // Xef - "`guild_id`"?? What is it?
    return select("settings", "guild_id", guild.id); // return one
  }
}

function insert(table, column, value) {
  let columns;
  if (Object.prototype.toString.call(column) === "[object Array]") {
    // if column == array => columns = "column1, column2..."
    for (i = 0; i != column.length; i++) {
      columns += column[i] + ", ";
    }
    columns += column[-0]; // columns = "... column5, column6 (w/o ',')"
  } else {
    columns = column;
  } // else columns == column

  let values;
  if (Object.prototype.toString.call(value) === "[object Array]") {
    //Same
    for (i = 0; i != value.length; i++) {
      values += value[i] + ", ";
    }
    values += value[-0];
  } else {
    values = value;
  }

  //let connection = connect();
  pool.getConnection(function(err, conn) {
    if (err) return console.log(err);
    //return conn;
    conn.query(`INSERT INTO ${table} (${columns}) values (${values})`, function(
      err,
      result,
      fields
    ) {
      if (err) throw err;
      endConnect(connection);
    });
  });
}

function update(table, column, value) {
  let updateString;
  if (Object.prototype.toString.call(column) === "[object Array]") {
    // as in the function insert
    for (i = 0; i != column.length; i++) {
      updateString += column[i] + "=" + value[i] + ", ";
    }
    updateString += column[-0] + "=" + value[-0];
  } else updateString += column + "=" + value;

  //let connection = connect();
  pool.getConnection(function(err, conn) {
    if (err) return console.log(err);
    //return conn;

    conn.query(`UPDATE ${table} SET ${updateString}`, function(
      err,
      result,
      fields
    ) {
      if (err) throw err;
      endConnect(connection);
    });
  });
}

exports.get_giuld_settings = get_giuld_settings;
