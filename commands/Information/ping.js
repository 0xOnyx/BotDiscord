const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, settings) => {
  message.delete();
  var Ping = require('ping-lite');

  var ip = args.join(' ');

  if (settings.langue === 'fr') {
    if (ip) {
      var ping = new Ping(ip);

      ping.send(function(err, ms) {
        const embedIp = new MessageEmbed()
        .setTitle('<:ping:730392948520386621> Ping <:ping:730392948520386621>')
        .setDescription(`**IP:** ${ip}\n**LATENCE:** ${ms} ms`)
        .setFooter("YZZY#1626 | Merci d'utiliser YZZY")
        .setTimestamp();

          message.channel.send(embedIp)
      });
  } else {
    const msg = await message.channel.send("<:ping:730392948520386621> Ping <:ping:730392948520386621>");
    const embedIp2 = new MessageEmbed()
        .setDescription(`**IP:** ${client.user}
        **LATENCE:** ${msg.createdTimestamp - message.createdTimestamp} ms
        **API:** ${Math.round(client.ws.ping)} ms
        **SHARD:** ${message.guild.shard.ping} ms`)
        .setFooter("YZZY#1626 | Merci d'utiliser YZZY")
        .setTimestamp();
    msg.edit(embedIp2)
  }
} if (settings.langue === 'en') {
  if (ip) {
    var ping = new Ping(ip);

    ping.send(function(err, ms) {
      const embedIp = new MessageEmbed()
      .setTitle('<:ping:730392948520386621> Ping <:ping:730392948520386621>')
      .setDescription(`**IP:** ${ip}\n**LATENCY:** ${ms} ms`)
      .setFooter("YZZY#1626 | Thanks for using YZZY")
      .setTimestamp();

        message.channel.send(embedIp)
    });
} else {
  const msg = await message.channel.send("<:ping:730392948520386621> Ping <:ping:730392948520386621>");
  const embedIp2 = new MessageEmbed()
      .setDescription(`**IP:** ${client.user}\n**LATENCY:** ${msg.createdTimestamp - message.createdTimestamp} ms\n**API:** ${Math.round(client.ws.ping)} ms\n**SHARD:** ${message.guild.shard.ping} ms`)
      .setFooter("YZZY#1626 | Thanks for using YZZY")
      .setTimestamp();
  msg.edit(embedIp2)
}
}
};

module.exports.help = {
  name: "ping",
  aliases: ['ping', 'pong'],
  category: 'information',
  description: "Renvoie la latence du bot",
  cooldown: 3,
  usage: '[<site>]',
  isUserAdmin: false,
  permissions: false,
  args: false
};