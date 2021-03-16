const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (client, role) => {
    const settings = await client.getGuild(role.guild);
    if(!settings.logChannel || settings.logChannel === 'none') return;

    try {
        const embed = new MessageEmbed()
        .setTitle(`⚔️ Role created: ${role.name}`)
        .addField(`Permissions`, `${role.permissions.toArray().join(', ')}`)
        .setColor(3066993)
        .setFooter(`Role ID: ${role.id}`)
        .setTimestamp();
        client.channels.cache.get(settings.logChannel).send(embed);
        } catch (e) {
        return;
        }
}