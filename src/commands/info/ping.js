exports.run = (client, message, args) => {
    const msg = message.channel.send(`Pinging....`);

        msg.edit(`Pong!
        Latency is ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms
        API Latency is ${Math.round(client.ping)}ms`);
}