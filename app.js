const Discord = require("discord.js");
const fs = require("fs"),
  path = require("path");

const client = new Discord.Client();
const config = require("./config.json");

client.config = config;

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

p = "./commands/"
fs.readdir(p, function (err, dirs) {
  if (err) {
    throw err;
  }

  dirs.map(function (dir) {
    return path.join(p, dir);
  }).filter(function (dir) {
    return fs.statSync(dir).isDirectory();
  }).forEach(function (dir) {
    fs.readdir(`./commands/${dir}/`, (err, files) => {
      if (err) return console.error(err);
      files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${dir}/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands.set(commandName, props);
      });
    });
  });
});

client.login(process.argv[2]);