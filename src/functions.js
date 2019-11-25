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

  console.log(`[${date}] (${where})${who} ${message}`);

  fs.appendFile("log.txt", log_str, function (error) {
    if (error) throw console.error(error);
  });

  if (!guild) return;
  let logs_channel = guild.channels.find(channel => channel.id === logs_channel_id);
  logs_channel.send(`[${date}] ${who} ${message}`)
    .catch(console.error); // then change
}

exports.log = log;