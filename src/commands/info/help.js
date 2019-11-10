exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) message.channel.send({
    embed: {
      color: 0x2ed32e,
      fields: [{
        name: "Help",
        value:  `${client.config.prefix}hi\n` +
          `${client.config.prefix}createchannel *name* *slots*\n` +
          `${client.config.prefix}ping`
      }],
    }
  });
  else message.channel.send({ // for administrators
    embed: {
      color: 0x2ed32e,
      fields: [{
        name: "Help",
        value:  `${client.config.prefix}hi\n` +
          `${client.config.prefix}createchannel *name* *slots*\n` +
          //`${client.config.prefix}mute *user* *time**Unit*\n` +
          //`// *Unit* (time unit) can be s, m, h, d. for example ${client.config.prefix}mute @N0Name#4213 666h\n` +
          //`${client.config.prefix}unmute *user*\n` +
          `${client.config.prefix}getsettings\n` +
          `${client.config.prefix}ping`
      }],
    }
  });
}