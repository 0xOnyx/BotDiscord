const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
    if (settings.langue === 'fr') {
        if(message.deletable) {
            message.delete();
        }
        const embed = new MessageEmbed()
  .setTitle(`Verification des statut`)

message.guild.members.cache.filter(z => z.presence.activities[0]).filter(e => e.presence.activities[0].state).filter(u => u.presence.activities[0].state.includes(`${args.join(" ")}`)).map(u => 
  embed.addField(`Utilisateur ${u.user.username}`, `A \`${args.join(" ")}\` dans son status`) ? '' : embed.addField(`Personne n'a ${args.join(" ")} dans son status`)
  )

  message.channel.send(embed)  
} if (settings.langue === 'en') {
        if(message.deletable) {
            message.delete();
        }

        const embed = new MessageEmbed()
        .setTitle(`Checking statut`)

        message.guild.members.cache.filter(z => z.presence.activities[0]).filter(e => e.presence.activities[0].state).filter(u => u.presence.activities[0].state.includes(`${args.join(" ")}`)).map(u => 
          embed.addField(`User ${u.user.username}`, `Have \`${args.join(" ")}\` in his status`)
          )
          message.channel.send(embed)
      };
}

module.exports.help = {
  name: "check-status",
  aliases: ['check-status', 'check-statut'],
  category: 'moderation',
  description: "Verifie les status de chaque membre du serveur",
  cooldown: 3,
  usage: '<word_to_search>',
  isUserAdmin: false,
  permissions: true,
  args: true
};