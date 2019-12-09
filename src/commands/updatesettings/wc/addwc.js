const db = require("../../../db.js");
const { log } = require("../../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You are **not administrator**!");
  if (args.length == 0) return message.reply("Not enough arguments. Type !-help");

  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    let nameWC = new String();
    if (args.length > 1) nameWC = args.slice(0, args.length).join(" ");
    else nameWC = String(args[0]);
    guildDB.whiteChannels.push(nameWC);
    const whiteChannelsJSON = JSON.stringify(guildDB.whiteChannels);
    if(whiteChannelsJSON.length >= 255) return message.reply("**Error:** Too much channels! Please shorten the channel names.");

    new Promise(function (resolve) {
      db.updateGuild("whiteChannels", `'${whiteChannelsJSON}'`, message.guild, resolve);
    }).then(function (res) {
      if(res) message.reply("White channels have been changed!");
      else return message.reply("Error :(");
      log(`White channels have been changed to ${whiteChannelsJSON} by ${message.author.tag}`, message.guild, "Guild " + message.guild, message.member.tag);
    });
  });
}