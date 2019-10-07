const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    switch (msg.content.toLowerCase()) {
        case '!-hi':
            msg.reply("Hi! I am super cool bot!");
            break;
        case '!-showhomework':
            msg.reply("Oh, it do not work yet");
    }
});

client.login(process.argv[2]);
