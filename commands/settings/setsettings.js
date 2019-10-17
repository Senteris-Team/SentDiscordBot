const db = require("./db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You do not have the need permission!");
    if (command.length < 3) return message.reply("**Error:** Not enough arguments.");
    if (command[1] == "guild_id") return message.reply("**Error:** You cannot change guild id!")

    var valueToUpdate = command.slice(2, command.length).join(" ");
    db.update("settings", command[1], valueToUpdate, "`guild_id`", message.guild.id, message)
    message.reply(`Setting ${command[1]} updated to '${valueToUpdate}'`)
    log(`update settings`, "Guild " + message.guild, message.member.tag);
}