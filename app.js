const Discord = require("discord.js");
const client = new Discord.Client();

var allowNewChannel = true;

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
    case "!-createchannel":
      if (allowNewChannel) {
        if (command.length == 1) {
          msg.reply("Not enough arguments. Type !-help");
        } else if (command.length == 2) {
          channel = makeChannel(msg, command[1], 0, msg);
          msg.reply("The channel is created.");
          allowNewChannel = false;
        } else {
          channel = makeChannel(msg, command[1], command[2], msg);
          msg.reply("The channel is created.");
          allowNewChannel = false;
        }
      } else {
        msg.reply("First enter the previously created channel");
      }
      break;
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  if (oldMember.voiceChannel) {
    if (oldMember.voiceChannel.members.size == 0) {
      var noDelete = ["69", "for unconfirmed", "AFK"];
      if (!noDelete.includes(oldMember.voiceChannel.name))
        oldMember.voiceChannel.delete();
    }
    if (newMember.voiceChannel) {
      allowNewChannel = true;
    }
  }
});

function makeChannel(message, name, limit, msg) {
  var server = message.guild;
  let category = server.channels.find(
    c => c.name == "Игровые" && c.type == "category"
  );
  server
    .createChannel(name, "voice")
    .then(channel => {
      channel.userLimit = limit;

      if (!category) throw new Error("Category of this channel does not exist");
      channel.setParent(category.id);
      channel.lockPermissions();
      channel
        .edit({
          bitrate: 96000
        })
        .then(vc => {})
        .catch(console.error);
      if (msg.member.voiceChannel) {
        msg.member.setVoiceChannel(channel);
      }
    })
    .catch(console.error);
}

client.login(process.argv[2]);
