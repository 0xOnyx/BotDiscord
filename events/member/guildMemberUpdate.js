const { MessageEmbed } = require('discord.js');

module.exports = async (client, oldMember, newMember) => {
// ! https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate  Voice channel update

    if(oldMember.user.bot) return;
    const settings = await client.getGuild(oldMember.guild);
    const userA = await client.getUser(oldMember.user);
    if(!settings.logChannel || settings.logChannel === 'none') return;
    const rolesAdded = newMember.roles.cache.filter(x => !oldMember.roles.cache.get(x.id));
    const rolesRemoved = oldMember.roles.cache.filter(x => !newMember.roles.cache.get(x.id));
    // const oldAvatar = `https://cdn.discordapp.com/avatars/${newMember.user.id}/${oldMember.user.avatar}.png?size=1024`;
    // const newAvatar = `https://cdn.discordapp.com/avatars/${newMember.user.id}/${newMember.user.avatar}.png?size=1024`;

    const embed = new MessageEmbed()
    .setAuthor(`${oldMember.user.tag}`, oldMember.user.displayAvatarURL())
    .setDescription(`**User ${oldMember} changed**`)
    .setColor(15105570)
    .setFooter(`User ID: ${newMember.id}`)
    .setTimestamp();

    // console.log(oldMember.nickname)
    // console.log(newMember.nickname)
    // console.log(oldMember.user.username)
    // console.log(newMember.user.username)
    // user nickname change
		if (oldMember.nickname != newMember.nickname) {
            const oldM = oldMember.nickname ? `${oldMember.nickname}` : `${oldMember.user.username}`
            const newM = newMember.nickname ? `${newMember.nickname}` : `${newMember.user.username}`
            embed.addField('Nickname', `${oldM} **->** ${newM}`)
        }
    // user username change
		if (oldMember.user.username != newMember.user.username) {
			embed.addField('Username', `${oldMember.user.username} **->** ${newMember.user.username}`)
        }
    // user avatar change
        if(userA.avatarURL != newMember.user.avatarURL({ format: 'png' })) {
            embed.setThumbnail(newMember.user.displayAvatarURL())
                embed.addField('Avatar', `[[before]](${userA.avatarURL}) **->** [[after]](${newMember.user.avatarURL({ format: 'png' })})`)
                client.updateUser(oldMember, { avatarURL: newMember.user.avatarURL({ format: 'png' }) });
        }
        
    // user discriminator change
        if (oldMember.user.discriminator != newMember.user.discriminator) {
			embed.addField('Discriminator', `${oldMember.user.discriminator} **->** ${newMember.user.discriminator}`)
        }
    // user roles change
        if(rolesAdded.size != 0) {
            let roleAddedString = '';
            for (const role of rolesAdded.array()) {
                roleAddedString += role.toString();
            }
            embed.addField(`✅ Added roles [${rolesAdded.size}]`, `${roleAddedString}`)
        }
        if(rolesRemoved.size != 0) {
            let roleRemovedString = '';
            for (const role of rolesRemoved.array()) {
                roleRemovedString += role.toString();
            }
            embed.addField(`❌ Removed roles [${rolesRemoved.size}]`, `${roleRemovedString}`)
        }
            client.channels.cache.get(settings.logChannel).send(embed);
}