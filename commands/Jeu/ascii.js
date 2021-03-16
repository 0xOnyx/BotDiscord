const figlet = require('figlet');

module.exports.run = async (client, message, args, settings) => {
    message.delete();
    if (settings.langue === 'fr') {
    if (!args[0]) return message.channel.send("<:no_check:730881778281218159> | Veuillez mettre un texte à transformer !");
    const color = args[0];
    const msg = args.slice(1).join(" ");

    figlet.text(msg, function (err, data) {
        if (data.length > 2000) return message.channel.send('<:no_check:730881778281218159> | Veuillez ne pas dépasser les 2000 caractères !')
        
        switch(color) {
            case "jaune": {
                return message.channel.send('```fix\n' + data + ' ```')
                break;
            }
            case "tex": {
                return message.channel.send('```tex\n$\n' + data + ' ```')
                break;
            }
            // case "orange": {
            //     return message.channel.send('```cs\n#Pas encore disponible ```')
            //     break;
            // }
            // case "rouge": {
            //     return message.channel.send('```diff\n-Pas encore disponible ```')
            //     break;
            // }
            case "turquoise": {
                return message.channel.send('```xl\n"\n' + data + ' "```')
                break;
            }
            case "gris": {
                return message.channel.send('```' + data + ' ```')
                break;
            }
            default :
            return message.channel.send(`Veuillez choisir une couleur. Utilisation de la commande: \`${settings.prefix}ascii [jaune, tex, gris, turquoise] <texte a mettre>\``)
            break;
    }
    },
    )
} if (settings.langue === 'en') {
    if (!args[0]) return message.channel.send("<:no_check:730881778281218159> | Please put a text to transform !");
    const color = args[0];
    const msg = args.slice(1).join(" ");

    figlet.text(msg, function (err, data) {
        if (data.length > 2000) return message.channel.send('<:no_check:730881778281218159> | Please do not exceed 2000 characters !')
        
        switch(color) {
            case "yellow": {
                return message.channel.send('```fix\n' + data + ' ```')
                break;
            }
            case "tex": {
                return message.channel.send('```tex\n$\n' + data + ' ```')
                break;
            }
            // case "orange": {
            //     return message.channel.send('```cs\n#Pas encore disponible ```')
            //     break;
            // }
            // case "rouge": {
            //     return message.channel.send('```diff\n-Pas encore disponible ```')
            //     break;
            // }
            case "turquoise": {
                return message.channel.send('```xl\n"\n' + data + ' "```')
                break;
            }
            case "grey": {
                return message.channel.send('```' + data + ' ```')
                break;
            }
            default :
            return message.channel.send(`Please choose a color. Using the command: \`${settings.prefix}ascii [yellow, tex, grey, turquoise] <text to put>\``)
            break;
    }
    },
    )
}
}

module.exports.help = {
    name: "ascii",
    aliases: ['ascii'],
    category: 'jeu',
    description: "Renvoie votre texte en ASCII.",
    cooldown: 3,
    usage: '<couleur> <texte>',
    isUserAdmin: false,
    permissions: false,
    args: false
};