module.exports = (client) => {
    log(`logged in as ${client.user.tag}!`, "BOT", "Client");

    client.user.setPresence({
        status: "online",
        game: {
            name: "you:b !-help for DogeHelp",
            type: "WATCHING"
        }
    });
}