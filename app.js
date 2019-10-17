const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("./db.js");
const ms = require("ms");
const fs = require("fs");

client.on("ready", () => {
  log(`logged in as ${client.user.tag}!`, "BOT", "Client");

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
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  log("4", "BOT");

  switch (command[0].toLowerCase()) {
    case `${prefix}help`: {
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
      break;
    }

    case `${prefix}homework_help`: case `${prefix}homework`: {
      message.reply(
        "```" + 
        `${prefix}showhomework\n` + 
        `${prefix}addhomework\n` + 
        `${prefix}removehomework\n` +
        `${prefix}rewritehomework\n` +
        "```"
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
      if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply( "**Error:** You do not have the **Unmute Members** permission!" );

      let tounmute = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(command[1])
      );
      if (!tounmute) return message.reply("Could not find user.");

      let unmuterole = message.guild.roles.find( muterole => muterole.name === "Muted" );
      tounmute.removeRole(unmuterole.id).catch(console.error);
      message.reply("The user has been unmuted.");
      break;
    }

    case `${prefix}mute`: {
      if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply( "**Error:** You do not have the **Mute Members** permission!" );

      let tomute = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(command[1])
      );
      if (!tomute) return message.reply("Could not find user.");
      if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Cannot mute them!");

      let muterole = message.guild.roles.find( muterole => muterole.name === "Muted" );
      tomute.addRole(muterole.id);
      message.guild.channels.forEach(channel =>
        channel
          .overwritePermissions(muterole, {
          SEND_MESSAGES: false
        }).then(updated =>
          {}
        ).catch(console.error)
      );
      let mutetime = command[2];
      if (!mutetime) return message.reply("You did not specify a time!");
      message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
      log(`mute ${tomute.user.tag}`, "Guild " + message.guild, message.author.tag);
      setTimeout(function() {
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted!`);
      }, ms(mutetime));
      break;
    }

    case `${prefix}createchannel`: {
      if (message.member.voiceChannel) {
        if (command.length == 1) message.reply("Not enough arguments. Type !-help");
        else if (command.length == 2) {
          channel = makeChannel(message, command[1], 0, message);
          message.reply("The channel is created.");
        } else {
          channel = makeChannel(message, command[1], command[2], message);
          message.reply("The channel is created.");
        }
      } else message.reply("First enter to a voice channel");
      break;
    }

    case `${prefix}getsettings`: {
      if (!message.member.hasPermission("VIEW_AUDIT_LOG")) return message.reply("**Error:** You do not have the need permission!");
      new Promise(function (resolve) {
        db.get_giuld_settings(message.guild, resolve);
      }).then(function(settings) {
        let str_white_channel_list = settings.white_channel_list.join(", ");
        message.reply(
          "Guild settings:\n" +
          "```" +
          `Guild ID: ${settings.guild_id}\n` +
          `white_channel_list: ${str_white_channel_list}` +
          "```"
        );
        log("requested settings", "Guild " + message.guild, message.author.tag);
      });
      break;
    }

    case `${prefix}setsettings`: {
      if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You do not have the need permission!");
      if (command.length < 3) return message.reply("**Error:** Not enough arguments.");
      if (command[1] == "guild_id") return message.reply("**Error:** You cannot change guild id!")
      
      var valueToUpdate = command.slice(2, command.length).join(" ");
      db.update("settings", command[1], valueToUpdate, "`guild_id`", message.guild.id, message)
      message.reply(`Setting ${command[1]} updated to '${valueToUpdate}'`)
      log(`update settings`, "Guild " + message.guild, message.member.tag);
      break;
    }
  }
});

client.on("voiceStateUpdate", (oldMember, newMember) => {
  new Promise(function (resolve) {
    db.get_giuld_settings(oldMember.guild, resolve);
  }).then(function (settings) {
    if (oldMember.voiceChannel) {
      if (oldMember.voiceChannel.members.size == 0) {
        var noDelete = settings.white_channel_list;
        if (!noDelete.includes(oldMember.voiceChannel.name))
          oldMember.voiceChannel.delete();
      }
      if (newMember.voiceChannel) {
      }
    }
  });
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
      log(`create voice channel ${name}`, "Guild " + message.guild, message.member.tag);
  }).catch(console.error);
}

function log(message, where = "", who = "") {
  var now = new Date();
  var options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  };
  let date = now.toLocaleString("ru", options);
  let log_str = `[${date}] (${where}) ${who} ${message}`
  console.log(log_str)

  fs.appendFile("log.txt", log_str, function (error) {
    if (error) throw console.error(error);
  });
}

client.login(process.argv[2]);
