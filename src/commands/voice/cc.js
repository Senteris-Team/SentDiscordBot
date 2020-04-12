exports.run = (client, message, args) => {
  client.commands.get("createchannel").run(client, message, args)
}