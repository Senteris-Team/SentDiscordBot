const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.reply("**Error:** You do not have the 'VIEW_AUDIT_LOG' permission!");
  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    const strWhiteChannels = guildDB.whiteChannels.join(", ");
    message.channel.send({ // for administrators 
      embed: {
        color: 0x2ed32e,
        fields: [{
          name: "Guild settings",
          value: `Guild ID: ${guildDB.guildID}\n` +
            `Bitrate: ${guildDB.bitrate}Kbps\n`+
            `Log channel ID: ${guildDB.logChannel}\n`+
            `White channels: ${strWhiteChannels}\n` +
            `Voice channels category ID: ${guildDB.voiceChannelsCategory}\n`+
            `Prefix: ${guildDB.prefix}`
        }],
      }
    });
  log("Requested settings", undefined, "Guild " + message.guild, message.author.tag);
  });
}