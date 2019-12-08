const db = require("../db.js");
const { log } = require("../functions.js");

module.exports = (client, messageReaction, user) => {
  const message = messageReaction.message;
  new Promise(function (resolve) { // Get guildDB.logChannel
    db.getGuild(message.guild, resolve);
  }).then(function (guildDB) {
    if(message.id == guildDB.roleMessage && message.channel.id == guildDB.roleChannel){
      const role = message.guild.roles.find(role => role.name.toLowerCase() === messageReaction.emoji.name.toLowerCase());

      let gamerole = false;
      guildDB.gameRoles.forEach(function(item, i, arr) {
        if (item == role.id) gamerole = true;
      });
      if (role && gamerole) { // We can add log `${messageReaction.emoji.name} role doesn't exist` to logs channel
        const member = message.guild.members.find(member => member.id === user.id);
        if (member) { // We can add log too
          member.addRole(role.id).catch();
        }
      }
    }
  });
};