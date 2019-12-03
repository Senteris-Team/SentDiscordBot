const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You are **not administrator**!");

  new Promise(function (resolve) {
    db.updateGuild("bitrate", args[0], message.guild, resolve);
  }).then(function (res) {
    if(res) message.reply("Bitrate of voice channels has been changed!");
    else return message.reply("Error :(");
    log(`Bitrate of voice channels has been changed by ${message.author.tag}`, message.guild, "Guild " + message.guild, message.member.tag);
  });
}