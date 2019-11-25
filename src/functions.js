const fs = require("fs");

function log(message, guild, where = "BOT", who = "") {

  logs_channel_id = 647523442589171714;

  var now = new Date();
  var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  let date = now.toLocaleString("ru", options);

  let log_str = `[${date}] (${where})${who} ${message}`;

  console.log(log_str);

  fs.appendFile("log.txt", log_str, function (error) {
    if (error) throw console.error(error);
  });

  if (!guild) return;
  console.log("Guild.id: "+ guild.id); // debug
  let logs_channel = guild.channels.find(logs_channel => logs_channel.id === logs_channel_id);
  console.log("logs_channel: "+ logs_channel.id); // debug
  logs_channel.send(`[${date}] ${who} ${message}`)
    .catch(console.error); // then change
}

exports.log = log;