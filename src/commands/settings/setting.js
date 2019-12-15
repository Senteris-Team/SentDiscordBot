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
            case "white-channels":
                settingToUpdate = 'whiteChannels';
                switch (args[1]) {
                    case "add": // ну да, зачем нам 2 файла и уменьшить длину команды, когда мы можем сделать одну... а можем сделать 47563 непонятных комманд для gource. да Женя?....
                        settings.whiteChannels.push(valueToUpdate);
                        valueToUpdate = `'${JSON.stringify(settings.whiteChannels)}'`;
                        break;
                    case "remove":
                        const index = settings.whiteChannels.indexOf(valueToUpdate);
                        if (index > -1) {
                            settings.whiteChannels.splice(index, 1);
                        } else {
                            return message.reply("**Error:** Channel not in white channels")
                        }
                        valueToUpdate = `'${JSON.stringify(settings.whiteChannels)}'`;
                        break;
                    case "set":
                        valueToUpdate = `'${valueToUpdate}'`;
                        break;
                    default:
                        return message.reply("**Error:** This action not exist.");
                }
                break;
            case "bitrate":
                settingToUpdate = 'bitrate';
                valueToUpdate = args[1];
                break;
            case "prefix":
                settingToUpdate = 'prefix';
                valueToUpdate = `'${args[1]}'`;
                break;
            case "log-channel":
                settingToUpdate = 'logChannel';
                valueToUpdate = args[1];
                break;
            case "voice-category":
                settingToUpdate = 'voiceChannelsCategory';
                valueToUpdate = args[1];
                break;
            // Game roles
            case "game-role":
                settingToUpdate = 'gameRoles';
                switch (args[1]) {
                    case "add":
                        settings.gameRoles.push(valueToUpdate);
                        valueToUpdate = `'${JSON.stringify(settings.gameRoles)}'`;
                        break;
                    case "remove":
                        const index = settings.gameRoles.indexOf(valueToUpdate);
                        if (index > -1) {
                            settings.gameRoles.splice(index, 1);
                        } else {
                            return message.reply("**Error:** Channel not in white channels")
                        }
                        valueToUpdate = `'${JSON.stringify(settings.gameRoles)}'`;
                        break;
                    case "set":
                        valueToUpdate = `'${valueToUpdate}'`;
                        break;
                    default:
                        return message.reply("**Error:** This action not exist.");
                }
                break;
            case "role-channel":
                settingToUpdate = 'roleChannel';
                valueToUpdate = args[1];
                break;
            case "role-message":
                settingToUpdate = 'roleMessage';
                valueToUpdate = args[1];
                break;
            default:
                return message.reply("**Error:** This setting not exist.");
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