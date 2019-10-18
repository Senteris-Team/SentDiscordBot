//const { log } = require("../functions.js");

module.exports = (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    if (message.content.indexOf(client.config.prefix) !== 0) return;

    const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return message.reply("**ERROR**: No this command!");
    cmd.run(client, message, args);
};