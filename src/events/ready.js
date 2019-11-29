const { log } = require("../functions.js");

module.exports = (client) => {
  log(`logged in as ${client.user.tag}!`, undefined , "BOT", "Client");

  client.user.setPresence({
    status: "online",
    game: {
      name: "TEST",
      //name: "you:b | !-help for DogeHelp",
      type: "WATCHING"
    }
  });
}