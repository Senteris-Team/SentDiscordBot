const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You are **not administrator**!");
  if (args.length == 0) return message.reply("Not enough arguments. Type !-help");

  const gameRoles = JSON.stringify(args);
  if(gameRoles.length >= 255) return message.reply("**Error:** Too much roles!");

  new Promise(function (resolve) {
    db.updateGuild("gameRoles", `'${whiteChannels}'`, message.guild, resolve);
  }).then(function (res) {
    if(res) message.reply("Game roles have been changed!");
    else return message.reply("Error :(");
    log(`Game roles have been changed to ${whiteChannels} by ${message.author.tag}`, message.guild, "Guild " + message.guild, message.member.tag);
  });
}