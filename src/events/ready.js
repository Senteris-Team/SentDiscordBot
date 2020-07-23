const { log } = require("../functions.js");

module.exports = (client) => {
  log(`logged in as ${client.user.tag}!`, undefined , "BOT", "Client");

  client.user.setActivity("Watching you:b| !-help v0.3", { type: 1 });
  client.user.setPresence({/*
    status: "idle",
    activity: {
      type: "CUSTOM_STATUS",
      name: "Testing"
    }*/
    status: "idle",
    activity: {
      type: "CUSTOM_STATUS",
      name: "Watching you:b| !-help v0.3"
    }
  });
}