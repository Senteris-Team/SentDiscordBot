const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You are **not administrator**!");
  if (args.length == 0) return message.reply("Not enough arguments. Type !-help");

  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    guildDB.gameRoles.splice(args[0], 1);

    const gameRolesJSON = JSON.stringify(guildDB.gameRoles);

    new Promise(function (resolve) {
      db.updateGuild("gameRoles", `'${gameRolesJSON}'`, message.guild, resolve);
    }).then(function (res) {
      if(res) message.reply("Game roles have been changed!");
      else return message.reply("Error :(");
      log(`Game roles have been changed to ${gameRolesJSON} by ${message.author.tag}`, message.guild, "Guild " + message.guild, message.member.tag);
    });
  }).catch(message.reply("**Error**"));
}