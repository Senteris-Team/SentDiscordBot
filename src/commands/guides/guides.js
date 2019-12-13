const db = require("../../db.js");

exports.run = (client, message, args) => {
  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    const p = guildDB.prefix;
    message.channel.send({
      embed: {
        color: 0x2ed32e,
        fields: [{
          name: "Guides",
          value: `${p}BaseGuide\n` +
            `${p}VoiceChannelsGuide\n` +
            `${p}GameRolesGuide\n` +
            "Гайды пока что только на русском языке:("
        }],
      }
    });
  });
}