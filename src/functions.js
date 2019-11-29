const fs = require("fs");
const db = require("./db.js");

function log(message, guild, where = "BOT", who = "") {

  var logChannelID;
  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    logChannelID = guildDB.logChannel;
  });

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

  fs.appendFile("log.txt", logStr, function (error) {
    if (error) throw console.error(error);
  });

  if (!guild) return; 
  if (!logChannelID) return;
  const logChannel = guild.channels.find(c => c.id == logChannelID && c.type === 'text');
  logChannel.send(`[${date}] ${who} ${message}`).catch();
}

exports.log = log;