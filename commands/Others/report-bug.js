const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports.run = (client, message, args, settings) => {
    client.statusHook = new WebhookClient("787634563392339989", "hOLGXTsCfSUlkvSOd8ZW0Ds60H8AS2DLVDMNnLO-sr_esTvSW1uKvbPQX282X0UTl02T");
    message.delete();
    const embed = new MessageEmbed()
    .setAuthor(message.author.tag)
    .setTitle("Bug !")
    .addFields(
        { name: `**De**`, value: `${message.author.tag}`, inline: false},
        { name: `**ID**`, value: `${message.author.id}`, inline: false},
        { name: `**Description du bug**`, value: '``` '+args.join(" ")+' ```', inline: false},
    )
    .setFooter("YZZY - V2.0.0")
    .setTimestamp()
    client.statusHook.send(embed);
    if (settings.langue === 'fr') {
    message.channel.send("Le bug a ete envoyé au serveur support du bot, sur le channel bug de notre serveur support, merci de votre soutien !")
    } if (settings.langue === 'en') {
        message.channel.send("The bug has been sent to the bot support server, on the bug channel of our support server, thank you for your support!")
    }
    };

module.exports.help = {
    name: "report-bug",
    aliases: ['bug', 'bugs', 'report-bug', 'report-bugs'],
    category: 'others',
    description: "Report un bug pour pouvoir le regler",
    cooldown: 3600,
    usage: `<bug>`,
    isUserAdmin: false,
    permissions: false,
    args: true
  };