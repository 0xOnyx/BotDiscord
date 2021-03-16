const { MessageEmbed } = require('discord.js');
module.exports = async (client, oldEmoji, newEmoji) => {
    const settings = await client.getGuild(newEmoji.guild);
    if(!settings.logChannel || settings.logChannel === 'none') return;

    const embed = new MessageEmbed()
    .setColor(15105570)
    .setTitle('📝 Emoji updated')
    .addField('Emoji update', `<:${newEmoji.name}:${newEmoji.id}> ${oldEmoji.name} **->** ${newEmoji.name}`)
    .setFooter(`Emoji ID: ${newEmoji.id}`)
    .setTimestamp();

    client.channels.cache.get(settings.logChannel).send(embed);
}