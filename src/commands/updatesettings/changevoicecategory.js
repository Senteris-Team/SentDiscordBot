const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You are **not administrator**!");

  new Promise(function (resolve) {
    db.updateGuild("voiceChannelsCategory", args[0], message.guild, resolve);
  }).then(function (res) {
    if(res) message.reply("ID of voice channels category has been changed!");
    else return message.reply("Error :(");
    log(`ID of voice channels category has been changed by ${message.author.tag}`, message.guild, "Guild " + message.guild, message.member.tag);
  });
}