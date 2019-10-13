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

function endConnect(connection) {
  connection.release(function(err) {
    if (err) throw err;
    console.log("A connection is closed:)");
  });
}

function select(table, col, value, resolve) {
  pool.getConnection(function(err, conn) {
    if (err) return console.log(err);
    conn.query(`SELECT * FROM ${table} WHERE ${col} = '${value}'`, function(
      err,
      result,
      fields
    ) {
      if (err) throw err;
      endConnect(conn);
      var json;
      result.forEach(function(row) {
        let string = JSON.stringify(row);
        json = JSON.parse(string);
        resolve(json);
        return json;
      });
    });
  });
}

function get_giuld_settings(guild, resolveMain) {
  new Promise(function(resolve) {
    select("settings", "guild_id", guild.id, resolve);
  }).then(function(settings) {
    if (!(typeof settings == "undefined")) {
      // if setting is not empty
      settings.white_channel_list = JSON.parse(settings.white_channel_list);
      resolveMain(settings);
    } else {
      console.log("New guild!")
      insert("settings", "`guild_id`", guild.id); // Add the settings
      get_giuld_settings(guild, resolveMain);
    }
  });
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

  pool.getConnection(function(err, conn) {
    if (err) return console.log(err);
    conn.query(`INSERT INTO ${table} (${columns}) values (${values})`, function(
      err,
      result,
      fields
    ) {
      console.log(result);
      if (err) throw err;
      endConnect(conn);
      console.log(err);
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

  pool.getConnection(function(err, conn) {
    if (err) return console.log(err);
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

exports.update = update;
exports.insert = insert;
exports.select = select;
exports.get_giuld_settings = get_giuld_settings;
