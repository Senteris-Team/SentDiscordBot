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
            `${p}Guides | гайдЫ ЫЫЫ\n` +
            `${p}ShowSettings\n` +
            `${p}Setting *setting*\n` +
            `\tSettings list: white-channels(add, remove, set)` // Дальше лень
        }],
      }
    });
  });
}