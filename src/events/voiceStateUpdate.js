const db = require("../db.js");

module.exports = (client, oldMember, newMember) => {
  new Promise(function (resolve) {
    db.select("guilds", "guildID", oldMember.guild.id, resolve);
  }).then(function (guildDB) {
    if (oldMember.voiceChannel) {
      if (oldMember.voiceChannel.members.size != 0) return;
      if(guildDB.voiceChannelsCategory != oldMember.voiceChannel.parent.name) return;

      const noDelete = guildDB.whiteChannels;
      if (noDelete.includes(oldMember.voiceChannel.name)) return;

      oldMember.voiceChannel.delete();
    }
  });
}