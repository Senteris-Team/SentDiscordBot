const { log } = require("../../functions.js");
const db = require("../../db.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("CONNECT")) return message.reply("**Error:** You do not have the **connect** permission!");
  if (message.member.voiceChannel) {
    if (args.length == 0) message.reply("Not enough arguments. Type !-help");
    else if (args.length == 1) {
      channel = makeChannel(message, args[0], 0, message);
      message.reply("The channel is created.");
    } else {
      channel = makeChannel(message, args[0], args[args.length - 1], message);
      message.reply("The channel is created.");
    }
  } else message.reply("First enter to a voice channel");
}

function makeChannel(message, name, limit, message) {
  const guild = message.guild;
  new Promise(function (resolve) {
    db.select("guilds", "guild_id", guild.id, resolve);
  }).then(function (guildDB) {
    const category = guild.channels.find( c => c.id == guildDB.voiceChannelsCategory && c.type == "category" );
  
    guild
    .createChannel(name, { type: "voice" })
    .then(channel => {
    channel.userLimit = limit;
    if (!category) throw new Error("Category of the channel does not exist");
    channel.setParent(category.id)
    channel
      .edit({ bitrate: guildDB.bitrate })
      .catch(message.reply("Cannot edit bitrate."));
    if (message.member.voiceChannel) message.member.setVoiceChannel(channel);
    //channel.lockPermissions().catch(console.error);
    log(`Created voice channel "${name}" by ${message.author.tag}`, message.guild, "Guild " + message.guild, message.member.tag);
    }).catch(console.error);
  });
}