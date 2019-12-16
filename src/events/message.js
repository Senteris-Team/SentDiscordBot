const db = require("../db.js");

module.exports = (client, message) => {
  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    const prefix = guildDB.prefix;
    let msg = message.content;

    if (message.author.bot) return;
    if (!message.guild) return;
    if (msg.indexOf(prefix) !== 0)
      if (msg.indexOf("!-") === 0 && msg.includes("help")) msg = prefix+"help"; // if user forgot prefix
      else return;
    
    const args = msg.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    
    const cmd = client.commands.get(command);
    if (!cmd) return message.reply("**ERROR**: No this command!");
    cmd.run(client, message, args);
  });
};