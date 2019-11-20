const { log } = require("../functions.js");

module.exports = (messageReaction, user) => {
  const message = messageReaction.message;
  console.log("Channel.name: "+ message.channel.name); // for debug

  if(message.id === "646435588827774997" && message.channel.name === "welcome-to-the-club-buddy"){
    let role = message.guild.roles.find(role => role.name.toLowerCase() === messageReaction.emoji.name.toLowerCase());
    if (!role) return; // We can add log `${messageReaction.emoji.name} role doesn't exist` to logs channel
    let member = message.guild.members.find(member => member.id === user.id);
    if (!member) return; // We can add log too

    try { member.roles.add(role); }
    catch(err) { log(err) }
  }
};