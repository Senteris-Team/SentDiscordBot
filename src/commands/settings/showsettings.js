const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.reply("**Error:** You do not have the need permission!");
  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    const strWhiteChannels = settings.whiteChannels.join(", ");
    message.reply(
      "Guild settings:\n" +
      "```" +
      `Guild ID: ${guildDB.guildID}\n` +
      `Bitrate: ${guildDB.bitrate}\n`+
      `Log channel ID: ${guildDB.logChannel}\n`+
      `White channels: ${strWhiteChannels}\n` +
      `Voice channels category ID: ${guildDB.voiceChannelsCategory}\n`+
      `Prefix: ${guildDB.prefix}\n`+
      "```"
    );
  log("Requested settings", undefined, "Guild " + message.guild, message.author.tag);
  });
}