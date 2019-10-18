exports.run = (client, message, args) => {
    new Promise(function (resolve) {
        const msg = message.channel.send(`Pinging....`, resolve);
    }).then (() => {
        msg.edit(`Pong!
        Latency is ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms
        API Latency is ${Math.round(client.ping)}ms`);
    });
}