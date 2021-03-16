const { MessageEmbed } = require("discord.js")
let object = ["⛰️" , "✂️", "📄"]
let calcul = Math.floor((Math.random() * object.length))

module.exports.run = async (client, message, args, settings) => {
    message.delete();

    if (settings.langue === 'fr') {
    if(args[0] === 'ciseaux' || args[0] === 'pierre' || args[0] === 'feuille') {
    const RPSEMBED = new MessageEmbed()
    .setColor('RANDOM')
    .setDescription(`**Vous avez sélectionner :** **${args[0]}** \n **Le bot à sélectionner : ${object[calcul]}**`)
    .setFooter(message.guild.me.displayName, client.user.displayAvatarURL);

    message.channel.send(RPSEMBED)
    } else {
        message.channel.send('Veuillez choisir entre pierre, feuille et ciseaux')
    }
} if (settings.langue === 'en') {
    if(args[0] === 'scissors' || args[0] === 'stone' || args[0] === 'leaf') {
        const RPSEMBED = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`**You have selected :** **${args[0]}** \n **The bot have select : ${object[calcul]}**`)
        .setFooter(message.guild.me.displayName, client.user.displayAvatarURL);
    
        message.channel.send(RPSEMBED)
        } else {
            message.channel.send('Please choose between stone, leaf and scissors')
        }
}
}

module.exports.help = {
    name: "rps",
    aliases: ['rps'],
    category: 'jeu',
    description: "Joue a pierre, feuille, ciseaux contre le bot",
    cooldown: 1,
    usage: '<pierre, feuille ou ciseaux>',
    isUserAdmin: false,
    permissions: false,
    args: true
  };

  /*
  const { MessageEmbed } = require("discord.js")
// const MC = '⛰️';
// const CC = '';
// const PC = '';
// const M = MC=1;
// const C = CC=2;
// const P = PC=3;
let object = ["⛰️" , "✂️", "📄"]
let calcul = Math.floor((Math.random() * object.length))

module.exports.run = async (client, message, args) => {
    const A = args[0];

    if(A === 'ciseaux' || A === 'pierre' || A === 'feuille') {
        if(A == 'ciseaux' && calcul == '📄' || A == 'pierre' && calcul == '✂️' || A == 'feuille' && calcul == '⛰️') {
        const gagnant = message.author.user.username;

        const RPSEMBED = new MessageEmbed()
        .setColor('RANDOM')
        .addFields(
            {name: `**Vous avez sélectionner :**`, value: `**${args[0]}**`},
            {name: `**Le bot à sélectionner :`, value: `**${object[calcul]}**`},
            {name: '**Gagnant:**', value: `${gagnant}`}
        )
        .setFooter(message.guild.me.displayName, client.user.displayAvatarURL);

        message.channel.send(RPSEMBED)
        } else if(calcul == 'ciseaux' && A == '📄' || calcul == 'pierre' && A == '✂️' || calcul == 'feuille' && A == '⛰️') {
            const gagnant = client.user.username;

            const RPSEMBED = new MessageEmbed()
            .setColor('RANDOM')
            .addFields(
                {name: `**Vous avez sélectionner :**`, value: `**${args[0]}**`},
                {name: `**Le bot à sélectionner :`, value: `**${object[calcul]}**`},
                {name: '**Gagnant:**', value: `${gagnant}`}
            )
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL);
    
            message.channel.send(RPSEMBED)
        } else if (calcul == 'ciseaux' && A == '✂️' || calcul == 'pierre' && A == '⛰️' || calcul == 'feuille' && A == '📄') {
            const RPSEMBED = new MessageEmbed()
            .setColor('RANDOM')
            .addFields(
                {name: `**Vous avez sélectionner :**`, value: `**${args[0]}**`},
                {name: `**Le bot à sélectionner :`, value: `**${object[calcul]}**`},
                {name: '**Gagnant:**', value: `EGALITE`}
            )
            .setFooter(message.guild.me.displayName, client.user.displayAvatarURL);
    
            message.channel.send(RPSEMBED)
        }
        } else {
            message.channel.send('Veuillez choisir entre pierre, feuille et ciseaux')
        }
}

module.exports.help = {
    name: "rps",
    aliases: ['rps'],
    category: 'jeu',
    description: "Joue a pierre, feuille, ciseaux contre le bot",
    cooldown: 1,
    usage: '<pierre, feuille ou ciseaux>',
    isUserAdmin: false,
    permissions: false,
    args: true
  };*/