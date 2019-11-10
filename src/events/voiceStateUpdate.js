const db = require("../db.js");

module.exports = (client, oldMember, newMember) => {
  new Promise(function (resolve) {
    db.get_giuld_settings(oldMember.guild, resolve);
  }).then(function (settings) {
    if (oldMember.voiceChannel) {
      if (oldMember.voiceChannel.members.size != 0) return;

      new Promise(function (resolve) {
        db.select("settings", "guild_id", oldMember.guild.id, resolve); // Get settings
      }).then(function (settings) {
        if(settings.voice_channels_category.name != oldMember.voiceChannel.parent.name) return;
      });

      var noDelete = settings.white_channel_list;
      if (noDelete.includes(oldMember.voiceChannel.name)) return;

      oldMember.voiceChannel.delete();
    }
  });
}