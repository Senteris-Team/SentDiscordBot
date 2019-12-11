const db = require("../../db.js");

exports.run = (client, message, args) => {
  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    const p = guildDB.prefix;

    if (!message.member.hasPermission("ADMINISTRATOR")) message.channel.send({
      embed: {
        color: 0x2ed32e,
        fields: [{
          name: "Help",
          value: `${p}Hi\n` +
            `${p}Ping\n` +
            `${p}CreateChannel *name* *slots*`
        }],
      }
    });
    else message.channel.send({ // for administrators
      embed: {
        color: 0x2ed32e,
        fields: [{
          name: "Help",
          value: `${p}Hi\n` +
            `${p}Ping\n` +
            `${p}CreateChannel *name* *slots*\n\n\n` +
            //`${p}mute *user* *time**Unit*\n` +
            //`// *Unit* (time unit) can be s, m, h, d. for example ${p}mute @N0Name#4213 666h\n` +
            //`${p}unmute *user*\n` +
            `${p}ShowSettings\n` +
            `${p}ChangePrefix *prefix*\n`+
            `${p}ChangeVoiceCategory *ID*\n`+
            `${p}ChangeLogChannel *ID*\n`+
            `${p}ChangeBitrate *bitrate(8-384)*\n`+
            `${p}ChangeWCs *channel names* | WC - white channel\n`+
            `For exaple ${p}ChangeWhiteChannels pubg pubg2 R6S GTA5\n`+
            `${p}AddWC *channel name*\n`+
            `${p}RemoveWC *channel name*\n\n`+
            `${p}AddGameRole *role id*\n`+
            `${p}RemoveGameRole *index*\n`+
            `${p}ChangeGameRoles *role ids* | As ChangeWCs\n`+
            `${p}ChangeRoleChannel *channel id*\n`+
            `${p}ChangeRoleMessage *message id*`
        }],
      }
    });
  });
}