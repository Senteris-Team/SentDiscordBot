const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You are **not administrator**!");
  if (args.length == 0) return message.reply("Not enough arguments. Type !-help");

  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    var deleteWCI = null;
    let deleteWCName = new String();
    if (args.length > 1) deleteWCName = args.slice(0, args.length).join(" ");
    else deleteWCName = String(args[0]); // I did not test what will be if I delete String() :)
    guildDB.whiteChannels.forEach(function(item, i, arr) {
      if(item == deleteWCName) deleteWCI = i; // I tried make it using indexOf() but it did not work
    });

    if(!deleteWCI) return message.reply("Channel not found");
    guildDB.whiteChannels.splice(deleteWCI, 1);

    const whiteChannelsJSON = JSON.stringify(guildDB.whiteChannels);

    new Promise(function (resolve) {
      db.updateGuild("whiteChannels", `'${whiteChannelsJSON}'`, message.guild, resolve);
    }).then(function (res) {
      if(res) message.reply("White channels have been changed!");
      else return message.reply("Error :(");
      log(`White channels have been changed to ${whiteChannelsJSON} by ${message.author.tag}`, message.guild, "Guild " + message.guild, message.member.tag);
    });
  });
}