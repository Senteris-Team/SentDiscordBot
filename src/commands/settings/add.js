const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You do not have the need permission!");
  if (args.length == 0) return message.reply("Add something *value* \n"+
                                            "First property can be:\n`wc` - white channel \n`gr` - game role\n"+
                                            "Example: Add wc RDR 2");
  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (settings) {
    let item = args.slice(2, args.length).join(" ");
    let settingToUpdate = '';

    switch (args[0]) {
      case "wc":{
        settingToUpdate = 'whiteChannels';
        settings.whiteChannels.push(item);
        item = `'${JSON.stringify(settings.whiteChannels)}'`;
        break;
      }
      case "gr":{
        settingToUpdate = 'gameRoles';
        settings.gameRoles.push(item);
        item = `'${JSON.stringify(settings.gameRoles)}'`;
        break;
      }
      default: return message.reply("error");
    }
    new Promise(function (resolve) {
      db.updateGuild(settingToUpdate, item, message.guild, resolve);
    }).then(function (res) {
      if(res) message.reply(`Added ${settingToUpdate} '${item}'`);
      else return message.reply("Error :(");
      log(`Update settings`, "Guild " + message.guild, message.member.tag);
    });
  });
};