const { MessageEmbed } = require("discord.js");
const moment = require("moment");

module.exports.run = async(client, message, args, settings) => {
        message.delete();
        let member = message.member;
        if (args[0]) member = message.guild.member(message.mentions.users.first());
        let user = member.user;
        const game = member.user.presence.activities ? member.user.presence.activities : 'rien';
        const surnom = member.nickname ? member.nickname : 'aucun';
        // const device = user.presence.clientStatus;

        // const userFlags = member.user.flags.toArray();
        // userFlags.map(flag => flags[flag]).join(', ')
        //let badges = flags[user.FLAGS];
        // let badges = await user.fetchFlags(flags).then(results => {
        //   console.log(results);
        // }).catch(error => {
        //   console.error(error);
        // });
        // ∙ Badges: ${userFlags}

        if (settings.langue === 'fr') {
        const embed = new MessageEmbed()
            .setColor('#ffffff')
            .setAuthor(`${user.tag}`, user.displayAvatarURL())
            .setThumbnail(user.displayAvatarURL())
            .setDescription(`
                **Utilisateur:** \`${user.username}\`
                **Tag:** \`${user.discriminator}\`
                **Surnom:** \`${surnom}\`
                **Bot:** \`${user.bot ? 'oui' : 'non'}\`
                **Créé le:** \`${moment.utc(user.createdAt).format('DD/MM/YYYY | hh:mm')}\`
                **Rejoins le:** \`${moment.utc(member.joinedAt).format('DD/MM/YYYY - hh:mm')}\`
                **Statut:** \`${user.presence.status.toUpperCase()}\`
                **Activités:** \` ${game} \`
                **Rôle:**
                ${member.roles.cache.map(roles => `\`${roles.name} \``).join(', ')}
                `)
                .setFooter(`${message.author.tag}`, message.author.avatarURL())
                .setTimestamp();

    message.channel.send(embed);
        } if (settings.langue === 'en') {
          const embed = new MessageEmbed()
          .setColor('#ffffff')
          .setAuthor(`${user.tag}`, user.displayAvatarURL())
          .setThumbnail(user.displayAvatarURL())
          .setDescription(`
                **User:** \`${user.username}\`
                **Tag:** \`${user.discriminator}\`
                **Nickname:** \`${surnom}\`
                **Bot:** \`${user.bot ? 'yes' : 'no'}\`
                **Created the:** \`${moment.utc(user.createdAt).format('MM/DD/YYYY | hh:mm')}\`
                **Join the:** \`${moment.utc(member.joinedAt).format('MM/DD/YYYY - hh:mm')}\`
                **Status:** \`${user.presence.status.toUpperCase()}\`
                **Activities:** \` ${game} \`
                **Role:**
                ${member.roles.cache.map(roles => `\`${roles.name} \``).join(', ')}
                `)
                .setFooter(`${message.author.tag}`, message.author.avatarURL())
                .setTimestamp();

  message.channel.send(embed);
        }
};
// **Device:** Web: ${device === 'online' ? '<:check:730881798866993283>' : '<:no_check:730881778281218159>'} Desktop: ${device === 'desktop' ? '<:check:730881798866993283>' : '<:no_check:730881778281218159>'} Mobile: ${device === 'mobile' ? '<:check:730881798866993283>' : '<:no_check:730881778281218159>'}
module.exports.help = {
  name: "userinfo",
  aliases: ['userinfo', 'ui'],
  category: 'information',
  description: "Renvoie des informations concernant un utilisateur (ou vous-même)!",
  cooldown: 4,
  usage: '[<mentionned_user>]',
  isUserAdmin: false,
  permissions: false,
  args: false
};