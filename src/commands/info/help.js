const db = require("../../db.js");

exports.run = (client, message, args) => {

  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    const prefix = guildDB.prefix;

    if (!message.member.hasPermission("ADMINISTRATOR")) message.channel.send({
      embed: {
        color: 0x2ed32e,
        fields: [{
          name: "Help",
          value: `${prefix}Hi\n` +
            `${prefix}CreateChannel *name* *slots*\n` +
            `${prefix}Ping`
        }],
      }
    });
    else message.channel.send({ // for administrators
      embed: {
        color: 0x2ed32e,
        fields: [{
          name: "Help",
          value: `${prefix}Hi\n` +
            `${prefix}CreateChannel *name* *slots*\n` +
            //`${prefix}mute *user* *time**Unit*\n` +
            //`// *Unit* (time unit) can be s, m, h, d. for example ${client.config.prefix}mute @N0Name#4213 666h\n` +
            //`${prefix}unmute *user*\n` +
            `${prefix}ShowSettings\n` +
            `${prefix}Ping\n` +
            `${prefix}ChangePrefix\n`+
            `${prefix}ChangeVoiceCategory`
        }],
      }
    });
});
}