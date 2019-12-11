const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You are **not administrator**!");
  if (args.length == 0) return message.reply("Not enough arguments. Type !-help");

  new Promise(function (resolve) {
    db.updateGuild("roleMessage", args[0], message.guild, resolve);
  }).then(function (res) {
    if(res) message.reply("ID of role message has been changed!"); // throw english books at me pls:D
    else return message.reply("Error :(");
    log(`ID of role message has been changed by ${message.author.tag}`, message.guild, "Guild " + message.guild, message.member.tag);
  });
}
