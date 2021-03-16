const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args, settings) => {
    message.delete();

    if (settings.langue === 'fr') {
    let member = message.member;
    if (args[0]) member = message.guild.member(message.mentions.users.first()); 
    let user = member.user;

    message.channel.send(`**${message.author.username}** voici l'avatar de __**${user.tag}**__ \n${user.displayAvatarURL({ dynamic: true })}`);
    } if (settings.langue === 'en') {
        let member = message.member;
        if (args[0]) member = message.guild.member(message.mentions.users.first()); 
        let user = member.user;
    
        message.channel.send(`**${message.author.username}** here is the avatar of __**${user.tag}**__ \n${user.displayAvatarURL({ dynamic: true })}`);
    }
}

module.exports.help = {
    name: "avatar",
    aliases: ['avatar', 'pp'],
    category: 'information',
    description: "Renvoie la photo de profil d'un utilisateur (ou vous-même)!",
    cooldown: 2,
    usage: '[<@user>]',
    isUserAdmin: false,
    permissions: false,
    args: false
  };