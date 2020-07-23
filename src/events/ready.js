const { log } = require("../functions.js");

module.exports = (client) => {
  log(`logged in as ${client.user.tag}!`, undefined , "BOT", "Client");

  client.user.setPresence({/*
    status: "idle",
    game: {
      name: "TEST!",
      type: "WATCHING"
    }*/
    status: "online",
    activity: {
      name: "Watching you:b| !-help v0.3",
      type: "CUSTOM_STATUS"
    }
  });
}