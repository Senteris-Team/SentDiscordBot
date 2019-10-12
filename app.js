const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("./db.js");
const ms = require("ms")

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("!-help for DogeHelp");
});

client.on("message", message => {
  var command = message.content.split(" ");
  switch (command[0].toLowerCase()) {
    case "!-help":
      message.reply(
        "```" +
          "!-showhomework \n" +
          "!-createchannel *name* *slots* \n" +
          "```"
      );
      break;
    case "!-hi":
      message.reply("Hi! I am super cool bot!");
      break;
    case "!-showhomework":
      message.reply("Oh, it does not work yet=(");
      break;
    case `!-addhomework`:
      message.reply("Oh, it does not work yet=(");
      break;
    case `!-unmute`:
        if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("**Error:** You don't have the **Unmute Members** permission!");
        let toumute = message.guild.member(message.mentions.users.first() || message.guild.members.get(command[1]));
        if(!toumute) return message.reply("Couldn't find user.");
        let unmuterole = message.guild.roles.find(muterole => muterole.name === "Muted");
        tomute.removeRole(unmuterole.id);
      break;
    case "!-mute":
          if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("**Error:** You don't have the **Mute Members** permission!");
          let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(command[1]));
          if(!tomute) return message.reply("Couldn't find user.");
          if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
          let muterole = message.guild.roles.find(muterole => muterole.name === "Muted");
          tomute.addRole(muterole.id);
          message.guild.channels.forEach(channel => channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
          })
          .then(updated => console.log(updated.permissionOverwrites.get(muterole.id)))
          .catch(console.error))
          let mutetime = command[2];
          if(!mutetime) return message.reply("You didn't specify a time!");
          
          message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
          
          setTimeout(function(){
          tomute.removeRole(muterole.id);
          message.channel.send(`<@${tomute.id}> has been unmuted!`);
          }, ms(mutetime));
          
          break;
    case "!-createchannel":
      if (allowNewChannel) {
        if (command.length == 1) {
          message.reply("Not enough arguments. Type !-help");
        } else if (command.length == 2) {
          channel = makeChannel(message, command[1], 0, message);
          message.reply("The channel is created.");
          allowNewChannel = false;
        } else {
          channel = makeChannel(message, command[1], command[2], message);
          message.reply("The channel is created.");
          allowNewChannel = false;
        }
      } else {
        message.reply("First enter the previously created channel");
      }
      break;
    case "!-testmysql":
      console.log(db.get_giuld_settings(message.guild));
      message.reply(db.get_giuld_settings(message.guild));
      break;
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  if (oldMember.voiceChannel) {
    if (oldMember.voiceChannel.members.size == 0) {
      var noDelete = ["69", "for unconfirmed", "AFK", "GParty!", "Invisible"];
      if (!noDelete.includes(oldMember.voiceChannel.name))
        oldMember.voiceChannel.delete();
    }
    if (newMember.voiceChannel) {
      allowNewChannel = true;
    }
  }
});

function makeChannel(message, name, limit, message) {
  var server = message.guild;
  let category = server.channels.find(
    c => c.name == "Игровые" && c.type == "category"
  );
  server
  .createChannel(name, { type: "voice" })
  .then(channel => {
    channel.userLimit = limit;

    if (!category) throw new Error("Category of the channel does not exist");
    channel.setParent(category.id);
    channel
    .edit({ bitrate: 96000 })
    .then(vc => {})
    .catch(console.error);
    if (message.member.voiceChannel) {
      message.member.setVoiceChannel(channel);
    }
    console.log(`User ${message.member.tag} create voice channel ${name}`);
  }).catch(console.error);
  if (message.member.voiceChannel) {
    message.member.setVoiceChannel(channel);
  }
  console.log(`User ${message.member.tag} create voice channel ${name}`);
}

client.login(process.argv[2]);
