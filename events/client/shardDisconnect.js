const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports = async (client, shard) => {
    client.statusHook = new WebhookClient("781238041900875816", "PrZ8cz8YsHJVjQM1dz0AY-n5pQsO6m9ATChZ3HMwbZiz-41yxrI_KnLw8AS9CSoZXKfr");
    
    const embed = new MessageEmbed()
    .setColor('#ff0000')
  .setTitle(`**[SHARD]** Shard **#${shard}** disconnected`)
  .setDescription(`**Disconnected on** \n **${client.guilds.cache.size.toString()}** servers, with **${client.guilds.cache.reduce((a, g) => a + g.memberCount,0)}** members`)
  .setFooter(`YZZY | Shard`)
  .setTimestamp();
    client.statusHook.send(embed);
}