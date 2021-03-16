const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args, settings) => {

    message.channel.send(`
Hi you are looking for a cool and multifunctional bot with a nice developer, Vemon is for you !

An attentive, friendly & competent staff 24/7.

Here are the commands / categories that are available =>

__:moneybag: Economy (in developement) __

__:tools: Moderation__

__:gear: Configuration __

__:information_source: Informations__

And more....

Here are some important links =>

:link: Support: https://discord.gg/JNHqUmmp9u

:link: Invitation: https://discordapp.com/oauth2/authorize?client_id=774704496399220756&scope=bot&permissions=8


:satellite_orbital: Developer: Ilan#0001
`)

if (settings.langue === 'fr') {
const embed = new MessageEmbed()
.setTitle("Partenariat avec \`vemon bot discord\`")
.setDescription("Si vous êtes intéressé, voici le lien du serveur: [Invitation](https://discord.gg/JNHqUmmp9u) et le lien du bot: [Bot invite](https://discordapp.com/oauth2/authorize?client_id=774704496399220756&scope=bot&permissions=8)")
.setFooter('Partenariat avec YZZY ? Viens dans le serveur support et mp LACOSTAR91#3705')
.setTimestamp();

message.channel.send(embed)
} if (settings.langue === 'en') {
    const embed = new MessageEmbed()
    .setTitle("Partnership with \`vemon discord bot\`")
    .setDescription("If you are interested, here is the server link: [Invite](https://discord.gg/JNHqUmmp9u) and the bot link: [Bot invite](https://discordapp.com/oauth2/authorize?client_id=774704496399220756&scope=bot&permissions=8)")
    .setFooter('Partnership with YZZY? Come to the support server and dm LACOSTAR91#3705')
    .setTimestamp();
    
    message.channel.send(embed)
}
}
module.exports.help = {
    name: "vemon",
    aliases: ['vemon', 'Vemon', 'VEMON'],
    category: 'partners',
    description: "Partenariat avec \`vemon bot discord\`",
    cooldown: 5,
    usage: ``,
    isUserAdmin: false,
    permissions: false,
    args: false
  };