const { log } = require("../functions.js");

module.exports = (client) => {
  log(`logged in as ${client.user.tag}!`, undefined , "BOT", "Client");

  client.user.setActivity("Watching you:b| !-help v0.3", { type: 1 });

}