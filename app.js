const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    var command = msg.content.toLowerCase();
    var commandArray = command.split(" ");
    switch (commandArray[0]) {
        case '!-help':
            msg.reply(`!-showhomework \n` +
                      `!-createchannel \n`);
        case '!-hi':
            msg.reply("Hi! I am super cool bot!");
            break;
        case '!-showhomework':
            msg.reply("Oh, it does not work yet");
            break;
        case '!-createchannel':
            msg.reply("Oh, it does not work yet");
            break;
    }
});

client.login(process.argv[2]);
