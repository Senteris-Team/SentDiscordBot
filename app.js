const Discord = require("../discord.js");
const client = new Discord.Client();

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", msg => {
    var command = msg.content.split(" ");
    switch (command[0].toLowerCase()) {
        case '!-help':
            msg.reply(
                "```" +
                "!-showhomework \n" +
                "!-createchannel *name* *slots* \n" +
                "```"
            );
            break;
        case '!-hi':
            msg.reply("Hi! I am super cool bot!");
            break;
        case '!-showhomework':
            msg.reply("Oh, it does not work yet=(");
            break;
        case `!-addhomework`:
            msg.reply("Oh, it does not work yet=(");
			break;
			case '!-deletechannel':
			const fetchedChannel = message.guild.channels.find(r => r.name === commandArray[1]);
			fetchedChannel.delete();
			if (!fetchedChannel) throw new Error("Channel with this name do not exist") 
			else { 
			msg.reply("The channel is deleted.");
			}
			break;
        case '!-createchannel':
            makeChannel(msg, commandArray[1], commandArray[2]) 
            msg.reply("The channel is created.");
			break;
		case '!-mute':
		const memberrule = guild.member(message.author);
		// TODO: permission check
		let tobemuted = message.guild.member(message.mentions.users.first() || message.guild.members.get(commandArray[1]));
		if(!tobemuted) return message.reply("Couldn't find user.");
		if(tobemuted.hasPermission("MANAGE_MESSAGES")) return message.reply("You can't mute them!");
		let muterole = message.guild.roles.find(muterole => muterole.name === "muted");
		if(!muterole){
			try {
			  muterole = await message.guild.createRole({
				name: "muted",
				color: "#000000",
				permissions:[]
			  })
			  message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(muterole, {
				  SEND_MESSAGES: false,
				  ADD_REACTIONS: false
				});
			  });
			} catch(e){
			  console.log(e.stack);
			}
		  }
		  let mutetime = commandArray[2];
		  if(!mutetime) return message.reply("You didn't write a time to mute!");
		  await(tobemuted.addRole(muterole.id));
		  message.reply(`<@${tobemuted.id}> has been muted for ${ms(ms(mutetime))}`);
		  setTimeout(function(){
			tobemuted.removeRole(muterole.id);
			message.channel.send(`<@${tobemuted.id}> has been unmuted!`);
		  }, ms(mutetime));
			break;
    }
});

function makeChannel(message, name, limit){
    var server = message.guild;

    server.createChannel(name, "voice")
    .then(channel => {
        channel.userLimit = limit;
        let category = server.channels.find(c => c.name == "Игровые" && c.type == "category");

        if (!category) throw new Error("Category of this channel does not exist");
        channel.setParent(category.id);
    }).catch(console.error);
};

client.login(process.argv[2]);
