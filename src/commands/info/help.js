exports.run = (client, message, args) => {
    message.channel.send({
        embed: {
            color: 0x2ed32e,
            fields: [{
                name: "Help",
                value:  "```" +
                        `${client.config.prefix}hi\n` +
                        `${client.config.prefix}createchannel *name* *slots*\n` +
                        `${client.config.prefix}mute *user* *time**Unit*\n` +
                        `// *Unit* (time unit) can be s, m, h, d. for example ${client.config.prefix}mute TSDoge 666d\n` +
                        `${client.config.prefix}unmute *user*\n` +
                        `${client.config.prefix}getsettings\n` +
                        `${client.config.prefix}setsettings *setting_name* *setting_var* //For developers\n` +
                        `${client.config.prefix}homework\n` +
                        "```"
            }
            ],
        }
    });
}