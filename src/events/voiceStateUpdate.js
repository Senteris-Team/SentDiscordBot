const db = require("../db.js");

module.exports = (client, oldMember, newMember) => {
  new Promise(function (resolve) {
    db.get_giuld_settings(oldMember.guild, resolve);
  }).then(function (settings) {
    if (oldMember.voiceChannel) {
      if (oldMember.voiceChannel.members.size == 0) {
        var noDelete = settings.white_channel_list;
        if (!noDelete.includes(oldMember.voiceChannel.name)) 
          oldMember.voiceChannel.delete();
      } //if (newMember.voiceChannel) { }
    }
  });
}