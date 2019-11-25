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
  let guild = message.guild;
  var category;
  new Promise(function (resolve) {
    db.select("settings", "guild_id", guild.id, resolve);
  }).then(function (settings) {
    category = guild.channels.find( c => c.name == settings.voice_channels_category && c.type == "category" );
  });
  guild
    .createChannel(name, { type: "voice" })
    .then(channel => {
    channel.userLimit = limit;
    if (!category) throw new Error("Category of the channel does not exist");
    channel.setParent(category.id)
    channel
      .edit({ bitrate: 128000 })
      .catch(console.error);
    if (message.member.voiceChannel) message.member.setVoiceChannel(channel);
    //channel.lockPermissions().catch(console.error);
    log(`Created a voice channel ${name}`, message.guild, "Guild " + message.guild, message.member.tag);
  }).catch(console.error);
}