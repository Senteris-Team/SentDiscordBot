exports.run = (client, message, args) => {
  if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("**Error:** You do not have the **Unmute Members** permission!");

  let tounmute = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[1])
  );
  if (!tounmute) return message.reply("Could not find user.");

  let unmuterole = message.guild.roles.find(muterole => muterole.name === "Muted");
  tounmute.removeRole(unmuterole.id).catch(console.error);
  message.reply("The user has been unmuted.");
}