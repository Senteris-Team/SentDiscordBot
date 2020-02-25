const db = require("../db.js");

module.exports = (client, oldMember, newMember) => {
  new Promise(function (resolve) {
    db.getGuild(oldMember.guild, resolve);
  }).then(function (guildDB) {
    if (oldMember.voiceChannel) {

      if (oldMember.voiceChannel.members.size != 0) return;
      if (guildDB.voiceChannelsCategory != oldMember.voiceChannel.parentID) return;

      const noDelete = guildDB.whiteChannels;
      if (noDelete.includes(oldMember.voiceChannel.name)) return;

      oldMember.voiceChannel.delete();
    }
    if(newMember.voiceChannel){
      const datenow = new Date();
      new Promise(function (resolve) {
        db.select("members", ["guildID", "userID"], [newMember.guild, newMember.id], resolve);
      }).then(function (memberDB) {
        if (memberDB != null){
          update("member", "enterVoiceChannel", 
            `${datenow.getFullYear()}${datenow.getMonth()}${datenow.getDate()}${datenow.getHours()}${datenow.getMinutes()}${datenow.getSeconds()}`, 
            ["guildID", "userID"], [newMember.guild, newMember.id]);
        }
        else { 
          insert("members", ["guildID", "userID"], [newMember.guild, newMember.id], resolve2); 
          update("member", "enterVoiceChannel", 
            `${datenow.getFullYear()}${datenow.getMonth()}${datenow.getDate()}${datenow.getHours()}${datenow.getMinutes()}${datenow.getSeconds()}`, 
            ["guildID", "userID"], [newMember.guild, newMember.id]);
        }
      });
    }
  });
}