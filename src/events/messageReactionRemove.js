module.exports = (client, messageReaction, user) => {
  console.log("8");
  const message = messageReaction.message;

  if(message.id == "646435588827774997" && message.channel.name === "welcome-to-the-club-buddy"){
    console.log("9");
    const role = message.guild.roles.find(role => role.name.toLowerCase() === messageReaction.emoji.name.toLowerCase());
    if (!role) return; // We can add log `${messageReaction.emoji.name} role doesn't exist` to logs channel
    const member = message.guild.members.find(member => member.id === user.id);
    if (!member) return; // We can add log too
    
    console.log("10");
    member.removeRole(role.id).catch(console.error());
    console.log("11");
  }
};