const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You do not have the need permission!");
  if (args.length == 0) return message.reply("!-Remove something *value* \n"+
                                            "First property can be:\n`wc` - white channel \n`gr` - game role\n"+
                                            "Example: Remove wc GTA SAMP");
  new Promise(function (resolve) {
    db.getGuild(message.guild, resolve);
  }).then(function (settings) {
    let item = args.slice(2, args.length).join(" ");
    let settingToUpdate = '';

    switch (args[0]) {
      case "wc":{
        const index = settings.gameRoles.indexOf(item);
        if (index > -1) settings.gameRoles.splice(index, 1);
        else return message.reply("**Error:** Channel not in white channels")
        valueToUpdate = `'${JSON.stringify(settings.gameRoles)}'`;
        break;
      }
      case "gr":{
        const index = settings.gameRoles.indexOf(item);
        if (index > -1) settings.gameRoles.splice(index, 1);
        else return message.reply("**Error:** Channel not in white channels")
        valueToUpdate = `'${JSON.stringify(settings.gameRoles)}'`;
        break;
      }
      default: return message.reply("Error");
    }
    new Promise(function (resolve) {
      db.updateGuild(settingToUpdate, item, message.guild, resolve);
    }).then(function (res) {
      if(res) message.reply(`Removed ${settingToUpdate} '${item}'`);
      else return message.reply("Error :(");
      log(`Update settings`, "Guild " + message.guild, message.member.tag);
    });
  });
};