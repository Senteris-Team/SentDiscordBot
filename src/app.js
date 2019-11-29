const Discord = require("discord.js");
const fs = require("fs"),
  path = require("path");
const client = new Discord.Client();
const config = require("./config.json");
const { log } = require("./functions.js");

client.config = config;

fs.readdir("./src/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    log(`event ${eventName}`, undefined, "BOT", "Load");
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

var p = "./src/commands/"
fs.readdir(p, function (err, dirs) {
  if (err) {
    throw err;
  }

  dirs.map(function (dir) {
    return path.join(p, dir);
  }).filter(function (dir) {
    return fs.statSync(dir).isDirectory();
  }).forEach(function (dir) {
    fs.readdir(`./${dir}/`, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const props = require(`../${dir}/${file}`);
        const commandName = file.split(".")[0];
        log(`command ${commandName}`, undefined, "BOT", "Load");
        client.commands.set(commandName, props);
      });
    });
  });
});

client.login(process.argv[2]);