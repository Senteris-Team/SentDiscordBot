exports.run = (client, message, args) => {
  message.channel.send({
    embed: {
      color: 0x2ed32e,
      fields: [{
        name: "Pong",
        value: "My Ping: " + Math.round(client.ping) + ' ms'
      }],
    }
  });
}