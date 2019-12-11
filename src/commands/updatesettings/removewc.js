const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You are **not administrator**!");
  if (args.length == 0) return message.reply("Not enough arguments. Type !-help");

  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    guildDB.whiteChannels.splice(args[0], 1);

    const whiteChannelsJSON = JSON.stringify(guildDB.whiteChannels);

    new Promise(function (resolve) {
      db.updateGuild("whiteChannels", `'${whiteChannelsJSON}'`, message.guild, resolve);
    }).then(function (res) {
      if(res) message.reply("White channels have been changed!");
      else return message.reply("Error :(");
      log(`White channels have been changed to ${whiteChannelsJSON} by ${message.author.tag}`, message.guild, "Guild " + message.guild, message.member.tag);
    });
  }).catch(message.reply("**Error**"));
}