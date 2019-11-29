module.exports = (client, message) => {

  var prefix;
  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    prefix = guildDB.prefix;
  });

  if (message.author.bot) return;
  if (!message.guild) return;

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  const cmd = client.commands.get(command);

  if (!cmd) return message.reply("**ERROR**: No this command!");
  cmd.run(client, message, args);
};