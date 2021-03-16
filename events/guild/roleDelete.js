const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = async (client, role) => {
    const settings = await client.getGuild(role.guild);
    if(!settings.logChannel || settings.logChannel === 'none') return;

    // const logscreate = new MessageEmbed()
    //         .setColor("#ff0000")
    //         .setTitle("Un role vient d'être supprimer")
    //         .addField('Nom', role.name, true)
    //         .addField('ID', role.id, true)
    //         .addField('Couleur', role.hexColor, true)
    //         .addField('Creer le', moment(role.createdAt).format("DD/MM/YYYY hh:mm:ss"), true)
    //         .setTimestamp();

    try {
        const embed = new MessageEmbed()
        .setTitle(`🗑️ Role deleted: ${role.name}`)
        .addField(`Color`, `[${role.hexColor}](https://www.color-hex.com/color/${oldRole.hexColor.slice(1)})`, true)
        .addField(`Show separately`, `${role.hoist}`, true)
        .addField(`Mentionable`, `${role.mentionable}`, true)
        .addField(`Permissions`, `${role.permissions.toArray().join(', ')}`)
        .setColor(15158332)
        .setFooter(`Role ID: ${role.id}`)
        .setTimestamp();
        client.channels.cache.get(settings.logChannel).send(embed);
        } catch (e) {
        return;
        }
}