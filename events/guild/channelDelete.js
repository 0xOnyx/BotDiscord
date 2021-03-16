const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (client, channel) => {
    if (channel.type == 'dm') return;
    const settings = await client.getGuild(channel.guild);
    if(!settings.logChannel || settings.logChannel === 'none') return;
    let categorie = channel.type === 'category' ? 'Category' : `${channel.type === 'text' ? '📝 Text channel' : `${channel.type === 'voice' ? '🔊 Voice channel' : `${channel.type === 'news' ? '📣 News channel' : `${channel.type === 'store' ? '🛒 Store channel' : `❓ Unknown`}`}`}`}`;

    // const logscreate = new MessageEmbed()
    //         .setColor("#ff0000")
    //         .setThumbnail(channel.guild.iconURL())
    //         .setTitle("Un salon vient d'être supprimer")
    //         .addField('Nom', channel.name, true)
    //         .addField('Type', channel.type, true)
    //         .setTimestamp();

    const embed = new MessageEmbed()
    .setColor(15158332)
    .setTitle(`${categorie} deleted: ${channel.name}`)
    .addField(`Name`, `${channel.name}`)
    .setFooter(`Channel ID: ${channel.id}`)
    .setTimestamp();

        client.channels.cache.get(settings.logChannel).send(embed);
}