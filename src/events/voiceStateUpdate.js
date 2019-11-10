const db = require("../db.js");

module.exports = (client, oldMember, newMember) => {
  new Promise(function (resolve) {
    db.select("settings", "guild_id", oldMember.guild.id, resolve);
  }).then(function (settings) {
    if (oldMember.voiceChannel) {
      if (oldMember.voiceChannel.members.size != 0) return;
      if(settings.voice_channels_category != oldMember.voiceChannel.parent.name) return;

      var noDelete = settings.white_channel_list;
      if (noDelete.includes(oldMember.voiceChannel.name)) return;

      oldMember.voiceChannel.delete();
    }
  });
}