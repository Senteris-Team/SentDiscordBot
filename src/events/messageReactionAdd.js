const { log } = require("../functions.js");

module.exports = (client, messageReaction, user) => {
  console.log("Robit"); // for debug
  var message = messageReaction.message;
  console.log("Channel.name: "+ messageReaction.message.channel.name); // for debug

  if(message.id === "647151954438651914" && message.channel.name === "новенькие"){
    let role = message.guild.roles.find(role => role.name.toLowerCase() === messageReaction.emoji.name.toLowerCase());
    if (!role) return; // We can add log `${messageReaction.emoji.name} role doesn't exist` to logs channel
    let member = message.guild.members.find(member => member.id === user.id);
    if (!member) return; // We can add log too

    try { member.roles.add(role); }
    catch(err) { log(err) }
  }
};