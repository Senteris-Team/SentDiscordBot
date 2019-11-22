const { log } = require("../functions.js");

module.exports = (client) => {
  log(`logged in as ${client.user.tag}!`, "BOT", "Client");

  client.user.setPresence({
    status: "online",
    game: {
      name: "TEST! The bot is being tested! It can turn off at ANY moment!", // remove the status in before merge/in conflict
      type: "WATCHING"
    }
  });
}