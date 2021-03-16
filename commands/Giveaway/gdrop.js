const Discord = require('discord.js');
// const path = require('path')

module.exports.run = async(client, message, args, settings) => {
    message.delete();
    let hasPerm = message.member.hasPermission('MANAGE_MESSAGES');
    let hasRole = message.member.roles.cache.find(r => r.name === 'Giveaways');

    if (settings.langue === 'fr') {
        if(hasPerm === false || !hasRole == null){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription("Vous devez avoir la permissions ``MANAGE_MESSAGES`` ou un rôle nommé `Giveaway` pour faire ça.")
                    .setTimestamp()
            )
        }

        let mainMsg = await message.channel.send(`**Bienvenue dans le lancement d'un drop.**\nVeuillez mentionner le salon où sera effectuer le drop.\n\`Si vous souhaitez quitter, écrivez **stop** ou **cancel**.\``)
        
        let error = false;
        let msg;
        await message.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 20000,
            errors: ["time"]
        }).then(collected => {
            msg = collected.first().content;
            collected.first().delete();
        }).catch((err) => {
            error = true;
            embed.edit(
                new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('RED')
                .setDescription("Vous n'avez pas entrer de salon. Annulation du drop..")
                .setTimestamp()
            );
            return;
        });
        if(error) return;
        msg = msg.replace('<', '').replace('#', '').replace('>', '');
        if(msg === 'stop' || msg === 'cancel'){
            return message.channel.send('Annulation du drop...');
        }
        let salon = message.guild.channels.cache.find(c => c.id === msg);
        if(!salon){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription('Oops, on dirait que ce salon est introuvable. Assurez vous que je puisse voir le salon, ainsi que je puisse écrire dedans.')
                    .setTimestamp()
            )
        }

        mainMsg.edit(`Veuillez maintenant saisir le lot qui sera à gagner lors du drop.\n\`Si vous souhaitez quitter, écrivez **stop** ou **cancel**.\``)

        error = false;
        let msg2;
        await message.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 20000,
            errors: ["time"]
        }).then(collected => {
            msg2 = collected.first().content;
            collected.first().delete();
        }).catch((err) => {
            error = true;
            embed.edit(
                new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('RED')
                .setDescription("Vous n'avez pas entrer de lot. Annulation du drop..")
                .setTimestamp()
            );
            return;
        });
        if(error) return;
        if(msg2 === 'stop' || msg2 === 'cancel'){
            return message.channel.send('Annulation du drop...');
        }

        mainMsg.edit('Le drop sera effectué dans le salon <#' + salon.id + '> dans 5 secondes.');
        setTimeout(async () => {
            salon.send('`🎉` **DROP** `🎉`')
            let m = await salon.send(
                new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({format: 'png', dynamic: 'true'}))
                    .setColor('#2f3136')
                    .setDescription(`La première personne qui cliquera sur \`🎁\` remportera le lot !\n\n\`🎁\`・Lot: **${msg2}**\n\`⏲️\`・Durée maximale: **30** minutes`)
                    .setFooter('Drop par ' + message.author.tag)
                    .setTimestamp()
            )
            m.react('🎁');

            const filtre = (reaction, user) => {
                return ['🎁'].includes(reaction.emoji.name) && !user.bot;
            };
            m.awaitReactions(filtre, { max: 1, time: 1800000, errors: ['time'] }).then(collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '🎁') {
                    salon.send(`Félicitation à <@${reaction.users.cache.last().id}> qui à été le premier à réagir au message et qui gagne **${msg2}** !`);
                }
            })
            .catch(collected => {
                console.log(collected);
            });
        }, 5000)
    } if (settings.langue === 'en') {
        if(hasPerm === false || !hasRole == null){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription("You need ``MANAGE_MESSAGES`` permissions or a role named `Giveaways` to dot that.")
                    .setTimestamp()
            )
        }

        let mainMsg = await message.channel.send(`**Welcome to the launch of a drop.**\nPlease mention the room where the drop will be carried out.\n\`If you wish to quit, write **stop** or **cancel**.\``)
        
        let error = false;
        let msg;
        await message.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 20000,
            errors: ["time"]
        }).then(collected => {
            msg = collected.first().content;
            collected.first().delete();
        }).catch((err) => {
            error = true;
            embed.edit(
                new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('RED')
                .setDescription("You didn't specified a channel. Cancelling drop..")
                .setTimestamp()
            );
            return;
        });
        if(error) return;
        msg = msg.replace('<', '').replace('#', '').replace('>', '');
        if(msg === 'stop' || msg === 'cancel'){
            return message.channel.send('Cancelling drop...');
        }
        let salon = message.guild.channels.cache.find(c => c.id === msg);
        if(!salon){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription('I can\'t find this channel. Are you sure that I can see it ?')
                    .setTimestamp()
            )
        }

        mainMsg.edit(`Now, enter the drop prize.\n\`If you wan't to leave, write **stop** or **cancel**.\``)

        error = false;
        let msg2;
        await message.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 20000,
            errors: ["time"]
        }).then(collected => {
            msg2 = collected.first().content;
            collected.first().delete();
        }).catch((err) => {
            error = true;
            embed.edit(
                new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('RED')
                .setDescription("You didn't specified a prize. Cancelling drop..")
                .setTimestamp()
            );
            return;
        });
        if(error) return;
        if(msg2 === 'stop' || msg2 === 'cancel'){
            return message.channel.send('Cancelling drop...');
        }

        mainMsg.edit('Drop will start in <#' + salon.id + '> in 5 seconds.');
        setTimeout(async () => {
            salon.send('`🎉` **DROP** `🎉`')
            let m = await salon.send(
                new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({format: 'png', dynamic: 'true'}))
                    .setColor('#2f3136')
                    .setDescription(`First to click on \`🎁\` will win !\n\n\`🎁\`・Prize: **${msg2}**\n\`⏲️\`・Max duration: **30** minutes`)
                    .setFooter('Drop par ' + message.author.tag)
                    .setTimestamp()
            )
            m.react('🎁');

            const filtre = (reaction, user) => {
                return ['🎁'].includes(reaction.emoji.name) && !user.bot;
            };
            m.awaitReactions(filtre, { max: 1, time: 1800000, errors: ['time'] }).then(collected => {
                const reaction = collected.first();
                if (reaction.emoji.name === '🎁') {
                    salon.send(`Congratulations <@${reaction.users.cache.last().id}> who was the first to react. He won **${msg2}** !`);
                }
            })
            .catch(collected => {
                console.log(collected);
            });
        }, 5000)
    }
}

module.exports.help = {
    name: "gdrop",
    aliases: ['gdrop'],
    category: 'giveaway',
    description: "Faire un drop",
    cooldown: 3,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false
  };