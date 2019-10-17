exports.run = (client, message, args) => {
    message.reply(
        "```" +
        `${prefix}hi\n` +
        `${prefix}createchannel *name* *slots*\n` +
        `${prefix}mute *user* *time**Unit*\n` +
        `// *Unit* (time unit) can be s, m, h, d. for example ${prefix}mute TSDoge 666d\n` +
        `${prefix}unmute *user*\n` +
        `${prefix}getsettings\n` +
        `${prefix}setsettings *setting_name* *setting_var* //For developers\n` +
        `${prefix}homework\n` +
        "```"
    );
}