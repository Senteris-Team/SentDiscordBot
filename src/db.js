var mysql = require("mysql");

var DBpassword = process.argv[3];
var pool = mysql.createPool({
  host: "localhost",
  user: "admin",
  password: DBpassword,
  database: "SentDiscordBot",
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
    conn.query(`SELECT * FROM ${table} WHERE ${col} = '${value}'`, function( err, result, fields ) {
      if (err) throw err;
      endConnect(conn);
      var json;
      if (result.length == 0) {
        resolve(undefined);
        return(undefined); // for what?
      }        
      result.forEach(function(row) {
        let string = JSON.stringify(row); // ?
        json = JSON.parse(string); // decode JSON
        resolve(json);
        return json; // for what?
      });
    });
  });
}

function getGuild(guild, resolveMain) {
  new Promise(function (resolve) {
    select("guilds", "guild_id", guild.id, resolve);
  }).then(function (settings) {
    if (!(typeof settings == "undefined")) { // if setting is not empty
      settings.whiteChannels = JSON.parse(settings.whiteChannels);
      resolveMain(settings);
    } else {
      console.log(`New guild! (${guild})`)
      insert("Guilds", "`guild_id`", guild.id); // Add the settings
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
    } columns += column[-0]; // columns = "... column5, column6 (w/o ',')"
  } else columns = column; // else columns == column

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
    conn.query(`INSERT INTO ${table} (${columns}) values (${values})`, function( err, result, fields ) {
      if (err) console.log(err);
      endConnect(conn);
    });
  });
}

function update(table, column, value, where_col, where_var, msg = '') {
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
    conn.query(`UPDATE ${table} SET \`${column}\` =  '${value}' WHERE ${where_col} = '${where_var}'`, function( err, result, fields ) {
      if (err) {
        if (err.code == "ER_BAD_FIELD_ERROR") {
          if (msg !== '') {
            msg.reply("This setting not exist!")
            //console.log(`Update ${table}: ${column} set to '${value}' where ${where_col} = '${where_var}' BUT column not exist!`)
          }
        } else { console.log(err); }  
      } else {
        //console.log(`Update ${table}: ${column} set to '${value}' where ${where_col} = '${where_var}'`)
      }
      endConnect(conn);
    });
  });
}

exports.update = update;
exports.insert = insert;
exports.select = select;
exports.getGuild = getGuild;
