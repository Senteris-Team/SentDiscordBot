exports.run = (client, message, args) => {
  let pingTimestamp = message.createdTimestamp;
  message.channel.send('Ping!')
  .then((reply) => {
    let pongTimestamp = reply.createdTimestamp;
    reply.edit(`Pong! Ping: \`${pongTimestamp-pingTimestamp}ms\``);
  });
}