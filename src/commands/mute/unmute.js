exports.run = (client, message, args) => {
  if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("**Error:** You do not have the **Unmute Members** permission!");

  let tounmute = message.guild.member(
    message.mentions.users.first() //|| message.guild.members.get(args[0]) does not work
  );
  if (!tounmute) return message.reply("Could not find the user.");

  let unmuterole = message.guild.roles.find(muterole => muterole.name === "Muted");
  try{
    console.log(unmuterole);
    tounmute.removeRole(unmuterole.id);
    message.reply("The user has been unmuted.");
  }
  catch (error){
    message.reply("Error!"); // There is SO MUCH information
    console.error('Error ' + e.name + ":" + e.message + "\n" + e.stack);
  }
}