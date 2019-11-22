const { log } = require("../functions.js");

module.exports = (client, messageReaction, user) => {
  console.log("messageReactionRemove"); // for debug
  var message = messageReaction.message;

  if(message.id == "646435588827774997" && message.channel.name === "welcome-to-the-club-buddy"){
    console.log("True"); // for debug
    let role = message.guild.roles.find(role => role.name.toLowerCase() === messageReaction.emoji.name.toLowerCase());
    log("required delete role " + role.name);
    if (!role) return; // We can add log `${messageReaction.emoji.name} role doesn't exist` to logs channel
    console.log("Role exist"); // for debug
    let member = message.guild.members.find(member => member.id === user.id);
    if (!member) return; // We can add log too
    console.log("Member exist"); // for debug

    member.roles.removeRole(role).catch(console.error());
  }
};