const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("./db.js");
const ms = require("ms");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setPresence({
    status: "online",
    game: {
      name: "you:b !-help for DogeHelp",
      type: "WATCHING"
    }
  });
});

client.on("message", message => {
  var prefix = "!-";
  var command = message.content.split(" ");

  if (message.author.bot) return;
  if (!message.guild) return; // !if message sent in something kind of PM
  if (!message.content.startsWith(prefix)) return;

  switch (command[0].toLowerCase()) {
    case `${prefix}help`: {
      message.reply(
        "```" +
          `${prefix}hi\n` +
          `${prefix}createchannel *name* *slots*\n` +
          `${prefix}mute *user* *time**Unit*\n` +
          `// *Unit* (time unit) can be s, m, h, d. for example ${prefix}mute TSDoge 666d\n` +
          `${prefix}unmute *user*` +
          "```"
      );
      break;
    }

    case `${prefix}homework_help`:
    case `${prefix}homework`: {
      message.reply(
        "```" + `${prefix}showhomework\n` + `${prefix}addhomework\n` + "```"
      );
      break;
    }

    case `${prefix}hi`: {
      message.reply("Hi! I am super cool bot!");
      break;
    }

    case `${prefix}showhomework`: {
      message.reply("Oh, it does not work yet=(");
      break;
    }

    case `${prefix}addhomework`: {
      message.reply("Oh, it does not work yet=(");
      break;
    }

    case `${prefix}unmute`: {
      if (!message.member.hasPermission("MUTE_MEMBERS"))
        return message.reply(
          "**Error:** You don't have the **Unmute Members** permission!"
        );
      let toumute = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(command[1])
      );
      if (!toumute) return message.reply("Couldn't find user.");
      let unmuterole = message.guild.roles.find(
        muterole => muterole.name === "Muted"
      );
      tomute.removeRole(unmuterole.id);
      break;
    }

    case `${prefix}mute`: {
      if (!message.member.hasPermission("MUTE_MEMBERS"))
        return message.reply(
          "**Error:** You don't have the **Mute Members** permission!"
        );
      let tomute = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(command[1])
      );
      if (!tomute) return message.reply("Couldn't find user.");
      if (tomute.hasPermission("MANAGE_MESSAGES"))
        return message.reply("Can't mute them!");
      let muterole = message.guild.roles.find(
        muterole => muterole.name === "Muted"
      );
      tomute.addRole(muterole.id);
      message.guild.channels.forEach(channel =>
        channel
          .overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          })
          .then(updated =>
            console.log(updated.permissionOverwrites.get(muterole.id))
          )
          .catch(console.error)
      );
      let mutetime = command[2];
      if (!mutetime) return message.reply("You didn't specify a time!");

      message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);

      setTimeout(function() {
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted!`);
      }, ms(mutetime));

      break;
    }

    case `${prefix}createchannel`: {
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
    }

    case `${prefix}getsettings`: {
      if (!message.member.hasPermission("VIEW_AUDIT_LOG"))
        return message.reply("**Error:** You don't have the need permission!");
      new Promise(function(resolve) {
        db.get_giuld_settings(message.guild, resolve);
      }).then(function(settings) {
        let str_white_channel_list = settings.white_channel_list.join(", ");
        message.reply(
          "Bot server settings:\n" +
            "```" +
            `ID server: ${settings.guild_id}\n` +
            `White channel list: ${str_white_channel_list}` +
            "```"
        );
      });
      break;
    }
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
    })
    .catch(console.error);
}

client.login(process.argv[2]);
