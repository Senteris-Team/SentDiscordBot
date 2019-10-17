const { log } = require("../functions.js");

exports.run = (client, message, args) => {
    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("**Error:** You do not have the **Mute Members** permission!");

    let tomute = message.guild.member(
        message.mentions.users.first() || message.guild.members.get(args[1])
    );
    if (!tomute) return message.reply("Could not find user.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Cannot mute them!");

    let muterole = message.guild.roles.find(muterole => muterole.name === "Muted");
    tomute.addRole(muterole.id);
    message.guild.channels.forEach(channel =>
        channel
            .overwritePermissions(muterole, {
                SEND_MESSAGES: false
            }).then(updated => { }
            ).catch(console.error)
    );
    let mutetime = args[2];
    if (!mutetime) return message.reply("You did not specify a time!");
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
    log(`mute ${tomute.user.tag}`, "Guild " + message.guild, message.author.tag);
    setTimeout(function () {
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> has been unmuted!`);
    }, ms(mutetime));
}