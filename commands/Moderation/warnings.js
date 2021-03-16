const { MessageEmbed } = require('discord.js');
const { Warns } = require("../../models/index");

module.exports.run = async (client, message, args, settings) => {
// Get user
const user = message.guild.member(message.mentions.users.first());
const member = client.getUsers(user);
if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`Vous n'avez pas la permission d'avertir des gens. La permission necessaire est \`EXPULSER DES MEMBRE\``)
// get warnings of user
try {
    await Warns.findOne({
        userID: user.user.id,
        guildID: message.guild.id,
    }, (err, warn) => {
        if(err) console.log(err);
        if (warn == null) {
            // There are no warnings with this user
            message.send(`Cet utilisateur n'a pas d'avertissement pour l'instant`).then(m => m.delete({ timeout: 3500 }));
        } else {
            // Warnings have been found
            let list = `Cet utilisateur a reçu **${warn.Reason.length}** avertissement(s):`;
            let i = 0;
            while (warn.Reason.length != i) {
                list += `**${i + 1}: Modérateur:** ${(message.guild.members.cache.get(warn.Moderater[i])) ? message.guild.members.cache.get(warn.Moderater[i]) : 'User left'}\n **Reason:** ${warn.Reason[i]}\n **Date:** ${warn.IssueDates[i]}\n\n`;
                i++;
            }
            const embed = new MessageEmbed()
                .setAuthor(`Liste d'avertissement pour ${user.user.tag}`, user.user.displayAvatarURL())
                .setDescription(list)
                .setTimestamp();
            message.channel.send(embed);
        }
    });
} catch (err) {
    console.log(err)
    // if (client.config.debug) client.logger.error(`${err.message} - command: warnings.`);
    message.channel.send(`Une erreur est survenue veuillez ressayer. Si l'erreur persiste veuillez contacter mon developpeur`).then(m => m.delete({ timeout: 5000 }));
}
}

module.exports.help = {
    name: "warning",
    aliases: ['warnings', 'warning', 'avertissements', 'avertissement'],
    category: 'moderation',
    description: "See the warns of an user",
    cooldown: 3,
    usage: '<@user>',
    isUserAdmin: true,
    permissions: true,
    args: true
  };