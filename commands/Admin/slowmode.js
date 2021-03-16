module.exports.run = async (client, message, args, settings) => {
  message.delete();
  
  if (settings.langue === 'en') {
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`I don't have permission to manage channels, so I can't change the channel's slowmode. Please give me permission to modify it`)
  if (isNaN(args[0])) return message.channel.send(`<:no_check:730881778281218159> ${args[0]} is not a number!`);
      let reason = message.content.slice(
        client.prefix + 9 + args[0].length + 1
      );
      if (!reason) {
        reason == "No reason provided!";
      }
      message.channel.setRateLimitPerUser(args[0], reason);
      message.channel.send(
        ` Slowmode of ${args[0]} seconde`
      );
  } if (settings.langue === 'fr') {
    if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send(`Je n'ai pas la permission de gerer les channels, donc je ne peux pas modifier le slowmode du channel. Veuillez m'accorder la permission pour le modifier`)
    if (isNaN(args[0])) return message.channel.send(`<:no_check:730881778281218159> Ce n'est pas un nombre!`);
    let reason = message.content.slice(
      client.prefix + 9 + args[0].length + 1
    );
    if (!reason) {
      reason == "Pas de raison donnée!";
    }
    message.channel.setRateLimitPerUser(args[0], reason);
    message.channel.send(
      ` Slowmode de ${args[0]} seconde`
    );
  }
}

  module.exports.help = {
    name: "slowmode",
    aliases: ['slowmode'],
    category: 'admin',
    description: "Modifier le slowmode d'un channel",
    cooldown: 3,
    usage: '<temps>',
    isUserAdmin: false,
    permissions: true,
    args: true
  };