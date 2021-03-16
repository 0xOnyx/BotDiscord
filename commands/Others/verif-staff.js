const { MessageEmbed } = require('discord.js');

module.exports.run = async (client, message, args, settings) => {
    let member = message.member;
    if (args[0]) member = message.guild.member(message.mentions.users.first()); 
    let user = member.user;
    const staff = ["507329636305207308", "612003957895594014", "722364284696395788", "719881185064386644", "747925129199091793"];

    message.delete();
    
    if (settings.langue === 'fr') {
    if(staff.includes(user.id)) {
 
        const verifembed = new MessageEmbed()
        .setColor("GREEN")
        .setThumbnail(user.displayAvatarURL())
        .setTitle('Verification de staff')
        .setDescription(`<:check:730881798866993283> ${user.tag} fait bien partie du staff de YZZY bot`)
        .setFooter("Demander par : " + message.author.tag)
 
        message.channel.send(verifembed);
    } else {
        const verifembed1 = new MessageEmbed()
        .setColor("RED")
        .setThumbnail(user.displayAvatarURL())
        .setTitle('Verification de staff')
        .setDescription(`<:no_check:730881778281218159> ${user.tag} ne fait pas partie du staff de YZZY bot`)
        .setFooter("Demander par : " + message.author.tag)
 
        message.channel.send(verifembed1);
    }
} if (settings.langue === 'en') {
    if(staff.includes(user.id)) {
 
        const verifembed = new MessageEmbed()
        .setColor("GREEN")
        .setThumbnail(user.displayAvatarURL())
        .setTitle('Staff verification')
        .setDescription(`<:check:730881798866993283> ${user.tag} is part of the staff of YZZY bot`)
        .setFooter("Ask by: " + message.author.tag)
 
        message.channel.send(verifembed);
    } else {
        const verifembed1 = new MessageEmbed()
        .setColor("RED")
        .setThumbnail(user.displayAvatarURL())
        .setTitle('Staff verification')
        .setDescription(`<:no_check:730881778281218159> ${user.tag} is not part of the staff of YZZY bot`)
        .setFooter("Ask by: " + message.author.tag)
 
        message.channel.send(verifembed1);
    }
}
}

module.exports.help = {
  name: "verif-staff",
  aliases: ['verif-staff', 'verification-staff', 'v-s'],
  category: 'others',
  description: "Vérifie si la personne fait partie du staff",
  cooldown: 4,
  usage: '<@user>',
  isUserAdmin: false,
  permissions: false,
  args: false
};