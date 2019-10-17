const db = require("../../db.js");
const { log } = require("../../functions.js");

exports.run = (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("**Error:** You do not have the need permission!");
    if (args.length < 3) return message.reply("**Error:** Not enough arguments.");
    if (args[1] == "guild_id") return message.reply("**Error:** You cannot change guild id!")

    var valueToUpdate = args.slice(2, args.length).join(" ");
    db.update("settings", args[1], valueToUpdate, "`guild_id`", message.guild.id, message)
    message.reply(`Setting ${args[1]} updated to '${valueToUpdate}'`)
    log(`update settings`, "Guild " + message.guild, message.member.tag);
}