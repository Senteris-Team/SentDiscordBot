const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("!-help for DogeHelp");
});

client.on("message", msg => {
  var command = msg.content.split(" ");
  switch (command[0].toLowerCase()) {
    case "!-help":
      msg.reply(
        "```" +
          "!-showhomework \n" +
          "!-createchannel *name* *slots* \n" +
          "```"
      );
      break;
    case "!-hi":
      msg.reply("Hi! I am super cool bot!");
      break;
    case "!-showhomework":
      msg.reply("Oh, it does not work yet=(");
      break;
    case `!-addhomework`:
      msg.reply("Oh, it does not work yet=(");
      break;
    case "!-deletechannel":
      const fetchedChannel = message.guild.channels.find(
        r => r.name === commandArray[1]
      );
      fetchedChannel.delete();
      if (!fetchedChannel)
        throw new Error("Channel with this name do not exist");
      else {
        msg.reply("The channel is deleted.");
      }
      break;
    case "!-createchannel":
      makeChannel(msg, commandArray[1], commandArray[2]);
      msg.reply("The channel is created.");
      break;
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  if (oldMember.voiceChannel) {
    console.log(oldMember.voiceChannel.members.size);
  }
});

function makeChannel(message, name, limit) {
  var server = message.guild;

  server
    .createChannel(name, "voice")
    .then(channel => {
      channel.userLimit = limit;
      let category = server.channels.find(
        c => c.name == "Игровые" && c.type == "category"
      );

      if (!category) throw new Error("Category of this channel does not exist");
      channel.setParent(category.id);
    })
    .catch(console.error);
}

client.login(process.argv[2]);
