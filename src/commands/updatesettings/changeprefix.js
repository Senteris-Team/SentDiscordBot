const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You are **not administrator**!");

  new Promise(function (resolve) {
    db.updateGuild("prefix", args[0], message.guild, resolve);
  }).then(function (res) {
    if(res) message.reply("prefix has been updated!");
    else message.reply("Error :(");
  });
}