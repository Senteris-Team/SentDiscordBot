const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You are **not administrator**!");
  if (args.length == 0) return message.reply("Not enough arguments. Type !-help");
  if(args[0].length > 5) return message.reply("Max prefix size is 5 symbols!");

  new Promise(function (resolve) {
    db.updateGuild("prefix", "'"+args[0]+"'", message.guild, resolve);
  }).then(function (res) {
    if(res) message.reply("prefix has been changed!");
    else return message.reply("Error :(");
    log(`Prefix has been changed by ${message.author.tag}`, message.guild, "Guild " + message.guild, message.member.tag);
  });
}