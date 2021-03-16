const { MessageEmbed } = require('discord.js');

module.exports = async (client, message) => {
    if (message.channel.type === 'dm') return;
    const settings = await client.getGuild(message.guild);
    if(!settings.logChannel || settings.logChannel === 'none') return;
    if(!message) return;
    // if(!message) message = 'embed supprimer';
    // if (message.startsWith(settings.prefix)) return;

    try {
        const embed = new MessageEmbed()
    .setColor("#ff0000")
    .setTitle("Message supprimer")
    .setDescription(`**Message supprimer:** 
     \`${message} \``)
    .addField('Channel', message.channel)
    .setFooter(`Auteur du message: ${message.author.tag}`, message.author.displayAvatarURL())
    .setTimestamp();

    client.channels.cache.get(settings.logChannel).send(embed)
    } catch {
        const embed = new MessageEmbed()
    .setColor("#ff0000")
    .setTitle("Message supprimer")
    .setDescription(`**Message supprimer:** 
     \`${message} \``)
    .addField('Channel', message.channel)
    .setFooter(`Auteur du message: Inconnu`)
    .setTimestamp();

    client.channels.cache.get(settings.logChannel).send(embed)
    }
}