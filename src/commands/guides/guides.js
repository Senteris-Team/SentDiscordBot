exports.run = (client, message, args) => {
  message.channel.send({
    embed: {
      color: 0x2ed32e,
      fields: [{
        name: "Guides",
        value: `${p}BaseGuide\n` +
          `${p}VoiceChannelsGuide\n` +
          `${p}GameRolesGuide\n` +
          "Гайды пока что только на русском языке:("
      }],
    }
  });
}