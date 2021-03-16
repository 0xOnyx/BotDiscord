const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports.run = (client, message, args, settings) => {
    client.statusHook = new WebhookClient("787634775157899304", "NqTYirITC8JSqNJPC6sBz_3J0rM0L3dKDB2M9P6a5TdkkgYasUQx3ms6QZkCdchvHBaf");
    message.delete();
    
    if (settings.langue === 'fr') {
    let stars;
    switch (args[0]) {
    case "1" :
    stars = "⭐";
    break;
    case "2" :
    stars = "⭐⭐"
    break;
    case "3" :
    stars = "⭐⭐⭐"
    break;
    case "4" :
    stars = "⭐⭐⭐⭐"
    break;
    case "5" :
    stars = "⭐⭐⭐⭐⭐"
    break;
    default :
    return message.channel.send(`<:no_check:730881778281218159> Votre avis n'a pas été pris en compte ! Pourquoi ? \n\t - l'argument ${args[0]} n'est pas un nombre valide. \n\t - l'argument ${args[0]} est supérieur à 5 ou inférieur à 0.`)
    break;
    }

const embed = new MessageEmbed()
.setColor("YELLOW")
.setAuthor(message.author.tag)
.setTitle("Nouvelle note !")
.addFields(
    { name: `De`, value: `${message.author}`, inline: false},
    { name: `Etoiles`, value: `${stars}`, inline: false},
    { name: `Commentaire`, value: '``` '+args.splice(1).join(" ")+' ```', inline: false},
)
.setFooter("YZZY - V2.0.0")
.setTimestamp()
client.statusHook.send(embed);
message.channel.send("L'avis a ete envoyé au serveur support du bot, sur le channel de note")
    } if (settings.langue === 'en') {
        let stars;
        switch (args[0]) {
        case "1" :
        stars = "⭐";
        break;
        case "2" :
        stars = "⭐⭐"
        break;
        case "3" :
        stars = "⭐⭐⭐"
        break;
        case "4" :
        stars = "⭐⭐⭐⭐"
        break;
        case "5" :
        stars = "⭐⭐⭐⭐⭐"
        break;
        default :
        return message.channel.send(`<:no_check:730881778281218159> Your opinion has not been taken into account! Why ? \n\t - the argument ${args[0]} is not a valid number. \n\t - the argument ${args[0]} is greater than 5 or less than 0.`)
        break;
        }
    
    const embed = new MessageEmbed()
    .setColor("YELLOW")
    .setAuthor(message.author.tag)
    .setTitle("Nouvelle note !")
    .addFields(
        { name: `De`, value: `${message.author}`, inline: false},
        { name: `Etoiles`, value: `${stars}`, inline: false},
        { name: `Commentaire`, value: '``` '+args.splice(1).join(" ")+' ```', inline: false},
    )
    .setFooter("YZZY - V2.0.0")
    .setTimestamp()
    client.statusHook.send(embed);
    message.channel.send("The notice was sent to the bot's support server, on the rating channel")
    }
};

module.exports.help = {
    name: "rate",
    aliases: ['rate', 'note', 'avis'],
    category: 'others',
    description: "Donne une note au bot !",
    cooldown: 604800,
    usage: `<nombre d'etoile> <comment>`,
    isUserAdmin: false,
    permissions: false,
    args: true
  };