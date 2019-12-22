const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You do not have the need permission!");

  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (settings) {
    let valueToUpdate = args.slice(2, args.length).join(" ");
    let settingToUpdate = '';

    switch (args[0]) {
      // Base settings
      case "wc":{
        settingToUpdate = 'whiteChannels';
        valueToUpdate = `'${valueToUpdate}'`;
        break;
      }
      case "bitrate":{
        settingToUpdate = 'bitrate';
        valueToUpdate = args[1];
        break;
      }
      case "prefix": {
        settingToUpdate = 'prefix';
        valueToUpdate = `'${args[1]}'`;
        break;
      }
      case "log-channel": {
        settingToUpdate = 'logChannel';
        valueToUpdate = args[1];
        break;
      }
      case "voice-category": {
        settingToUpdate = 'voiceChannelsCategory';
        valueToUpdate = args[1];
        break;
      }
      //#region  Game roles
      case "gr": {
        settingToUpdate = 'gameRoles';
        valueToUpdate = `'${valueToUpdate}'`;
        break;
      }
      case "role-channel": {
        settingToUpdate = 'roleChannel';
        valueToUpdate = args[1];
        break;
      }
      case "role-message": {
        settingToUpdate = 'roleMessage';
        valueToUpdate = args[1];
        break;
      }
      //#endregion
      default: return message.reply("**Error:** This setting not exist.");
    }
    new Promise(function (resolve) {
      db.updateGuild(settingToUpdate, valueToUpdate, message.guild, resolve);
    }).then(function (res) {
      if(res) message.reply(`Setting ${settingToUpdate} updated to '${valueToUpdate}'`);
      else return message.reply("Error :(");
      log(`update settings`, "Guild " + message.guild, message.member.tag);
    });
  });
};