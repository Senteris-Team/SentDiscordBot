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
            case "white-channels":
                settingToUpdate = 'whiteChannels';
                switch (args[1]) {
                    case "add":
                        settings.whiteChannels.push(valueToUpdate);
                        valueToUpdate = JSON.stringify(settings.whiteChannels);
                        break;
                    case "remove":
                        const index = settings.whiteChannels.indexOf(valueToUpdate);
                        if (index > -1) {
                            settings.whiteChannels.splice(index, 1);
                        } else {
                            return message.reply("**Error:** Channel not in white channels")
                        }
                        break;
                    default:
                        return message.reply("**Error:** Not enough arguments.");
                }
                break;
            default:
                return message.reply("**Error:** Not enough arguments.");
        }
        new Promise(function (resolve) {
            db.updateGuild(settingToUpdate, `'${valueToUpdate}'`, message.guild, resolve);
        }).then(function (res) {
            if(res) message.reply(`Setting ${settingToUpdate} updated to '${valueToUpdate}'`);
            else return message.reply("Error :(");
            log(`update settings`, "Guild " + message.guild, message.member.tag);
        });
    });
};