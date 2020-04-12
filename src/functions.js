const fs = require("fs");
const db = require("./db.js");

function log(message, guild = undefined, where = "BOT", who = "") {
  
  var now = new Date();
  var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  const date = now.toLocaleString("ru", options);

  const logStr = `[${date}](${where})${who} ${message}`;

  console.log(logStr);

  fs.appendFile("log.txt", logStr + '\n', function (error) {
    if (error) throw console.error(error);
  });

  if (!guild) return; // if the log does not need to be sent to guild's log channel -> arg guild must be empty
  guildLog(message, guild);
}

function guildLog(message, guild) {
  new Promise(function (resolve) { // Get guildDB.logChannel
    db.getGuild(guild, resolve);
  }).then(function (guildDB) {
    if (!guildDB.logChannel) return; // if log channel unspecified
    const logChannel = guild.channels.find(c => c.id == guildDB.logChannel && c.type === 'text');
    if (logChannel != null) logChannel.send(message).catch();
  });
}

exports.log = log;
exports.guildLog = guildLog;