const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.reply("**Error:** You do not have the need permission!");
  new Promise(function (resolve) {
    db.get_giuld_settings(message.guild, resolve);
  }).then(function (settings) {
    let str_white_channel_list = settings.white_channel_list.join(", ");
    message.reply(
      "Guild settings:\n" +
      "```" +
      `Guild ID: ${settings.guild_id}\n` +
      `white_channel_list: ${str_white_channel_list}` +
      "```"
    );
  log("Requested settings", undefined, "Guild " + message.guild, message.author.tag);
  });
}