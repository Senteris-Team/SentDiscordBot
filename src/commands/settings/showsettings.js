const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.reply('**Error:** You do not have "view audit log" permission!');
  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    const strWhiteChannels = guildDB.whiteChannels.join(", ");
    const strGameRoles = guildDB.gameRoles.join(", ");

    // role ids -> role names
    let gameRoleNames = new Array();
    const roles = message.guild.roles;
    guildDB.gameRoles.forEach(function(item, i, arr) {
      gameRole = roles.find(role => role.id == item);
      if (gameRole != null) { gameRoleNames.push(gameRole.name); }
      else gameRoleNames.push("unknown");
      gameRole = null;
    });
    const strGameRolesNames = gameRoleNames.join(", ");

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
            `Prefix: ${guildDB.prefix}\n\n`+
            `GameRole ids: ${strGameRoles}\n`+
            `GameRoles names: ${strGameRolesNames}\n`+
            `Role message ID: ${guildDB.roleMessage}\n`+
            `Role channel ID: ${guildDB.roleChannel}`
        }],
      }
    });
  log("Requested settings", undefined, "Guild " + message.guild, message.author.tag);
  });
}