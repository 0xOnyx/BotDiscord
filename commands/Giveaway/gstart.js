const Discord = require('discord.js');
const ms = require('ms');
const path = require('path');
const fs = require('fs')

module.exports.run = async (client, message, args, settings) => {
    message.delete();
  
    let hasPerm = message.member.hasPermission('MANAGE_MESSAGES');
    let hasRole = message.member.roles.cache.find(r => r.name === 'Giveaways');

    if (settings.langue === 'fr') {

        if(hasPerm === false || !hasRole == null) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription('Il vous faut la permission `MANAGE_MESSAGES` ou un rôle nommé `Giveaways` pour faire cette commande.')
                    .setTimestamp()
            )
        }

        if(!args[0]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription(`Veuillez entrer la durée du giveway.\n\n__Exemple__ : \`${settings.prefix}gstart 1m 1 Nitro Classique\``)
                    .setTimestamp()
            )
        }

        if(!args[1]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription(`Veuillez entrer le nombre de gagnant.\n\n__Exemple__ : \`${settings.prefix}gstart 1m 1 Nitro Classique\``)
                    .setTimestamp()
            )
        }

        if(!args[2]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription(`Veuillez entrer le lot à gagner.\n\n__Exemple__ : \`${settings.prefix}gstart 1m 1 Nitro Classique\``)
                    .setTimestamp()
            )
        }

        message.delete();

        let embed = await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('__FINALISATION__')
                .setColor('#2f3136')
                .setDescription('__Voulez vous ajouter des conditions de participation ?__\n\n> ``<idD\'unServeur>``・Obligation de rejoindre le serveur.\n> ``<idD\'unRole>``・Obligation d\'avoir un rôle.\n> ``non``・Lancer le giveaway directement.\n\nPour ajouter une condition, veuillez mettre l\'identifiant du rôle ou du serveur souhaité.')
        )
        let error = false;
        let id;
        await message.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 60000,
            errors: ["time"]
        }).then(collected => {
            id = collected.first().content;
            collected.first().delete()
        }).catch((err) => {
            error = true;
            embed.edit(
                new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('RED')
                .setDescription("Vous n'avez pas entrer de message. Annulation du giveaway...")
                .setTimestamp()
            );
            return;
        });
        if(error) return;
        if(id.toLowerCase() === 'non'){
            let giveawayMessage = await client.giveawaysManager.start(message.channel, {
                time: ms(args[0]),
                prize: args.slice(2).join(" "),
                winnerCount: parseInt(args[1]),
                messages: {
                    giveaway: "🎉 **GIVEAWAY** 🎉",
                    giveawayEnded: "🎉 **GIVEAWAY TERMINE** 🎉",
                    timeRemaining: `\n\`⏲️\`・Temps restant: **{duration}**!\n\`👑\`・Host par: ${message.author}\n\`🏆\`・Gagnant(s): ${parseInt(args[1])}`,
                    inviteToParticipate: "Réagis avec 🎁 pour participer!",
                    winMessage: "\`🎉\`・Bien joué, {winners}! Vous gagnez **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: `\`⛔\`・Le giveaway à été annulé car il n'y a aucune participation correcte.\n\`👑\`・Host par: ${message.author}`,
                    winners: `\`🏆\`・Gagnant(s)`,
                    endedAt: "Fin le",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false
                    }
                }
            });
            let conditionsServers = require(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')));
            let conditionsRoles = require(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')));
            conditionsServers[giveawayMessage.messageID] = {
                conditionServer: 'Aucune'
            }
            conditionsRoles[giveawayMessage.messageID] = {
                conditionRole: 'Aucune'
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')), JSON.stringify(conditionsServers, null, 2), (err) => {
                if(err) console.log(err)
            });
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')), JSON.stringify(conditionsRoles, null, 2), (err) => {
                if(err) console.log(err)
            });
            return;
        }
        let guild = client.guilds.cache.find(g => g.id === id);
        let role = message.guild.roles.cache.find(r => r.id === id);
        if(!guild && !role){
            return embed.edit(
                new Discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription(`Ce rôle, ou serveur est introuvable.\n\n・__Pour les serveurs__: Assurez vous que je soit sur le serveur cible.\n・__Pour les rôles__: Assurez vous d'entrer un indentifiant de rôle.`)
            )
        }
        embed.delete()
        let giveawayMessage = await client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(" "),
            winnerCount: parseInt(args[1]),
            messages: {
                giveaway: "🎉 **GIVEAWAY** 🎉",
                giveawayEnded: "🎉 **GIVEAWAY TERMINE** 🎉",
                timeRemaining: `\n\`⏲️\`・Temps restant: **{duration}**!\n\`👑\`・Host par: ${message.author}\n\`🏆\`・Gagnant(s): ${parseInt(args[1])}`,
                inviteToParticipate: "Réagis avec 🎁 pour participer!",
                winMessage: "\`🎉\`・Bien joué, {winners}! Vous gagnez **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: `\`⛔\`・Le giveaway à été annulé car il n'y a aucune participation correcte.\n\`👑\`・Host par: ${message.author}`,
                winners: `\`🏆\`・Gagnant(s)`,
                endedAt: "Fin le",
                units: {
                    seconds: "secondes",
                    minutes: "minutes",
                    hours: "heures",
                    days: "jours",
                    pluralS: false
                }
            }
        });

        if(client.guilds.cache.find(g => g.id === id)){
            let guild = client.guilds.cache.find(g => g.id === id);

            let conditionsServers = require(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')));
            conditionsServers[giveawayMessage.messageID] = {
                conditionServer: 'Aucune'
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')), JSON.stringify(conditionsServers, null, 2), (err) => {
                if(err) console.log(err)
            });
            let conditionServer = conditionsServers[giveawayMessage.messageID].conditionServer;

            let chx = guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0);
            let invitation = await chx.createInvite({
                maxAge: 0,
                maxUses: 0
            }).catch(console.error);

            conditionsServers[giveawayMessage.messageID] = {
                conditionServer: guild.id
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')), JSON.stringify(conditionsServers, null, 2), (err) => {
                if(err) console.log(err)
            });

            let conditionsRoles = require(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')));
            conditionsRoles[giveawayMessage.messageID] = {
                conditionRole: 'Aucune'
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')), JSON.stringify(conditionsRoles, null, 2), (err) => {
                if(err) console.log(err)
            });
            
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__CONDITION__')
                    .setColor('#2f3136')
                    .setDescription('Pour participer au giveaway, vous devez rejoindre le serveur [' + guild.name + '](https://discord.gg/' + invitation.code + ')')
            )
        } else if(message.guild.roles.cache.find(r => r.id === id)){
            let role = message.guild.roles.cache.find(r => r.id === id);

            let conditionsRoles = require(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')));
            conditionsRoles[giveawayMessage.messageID] = {
                conditionRole: 'Aucune'
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')), JSON.stringify(conditionsRoles, null, 2), (err) => {
                if(err) console.log(err)
            });
            let conditionRole = conditionsRoles[giveawayMessage.messageID].conditionsRoles;

            conditionsRoles[giveawayMessage.messageID] = {
                conditionRole: role.id
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')), JSON.stringify(conditionsRoles, null, 2), (err) => {
                if(err) console.log(err)
            });       
            
            let conditionsServers = require(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')));
            conditionsServers[giveawayMessage.messageID] = {
                conditionServer: 'Aucune'
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')), JSON.stringify(conditionsServers, null, 2), (err) => {
                if(err) console.log(err)
            });
            
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__CONDITION__')
                    .setColor('#2f3136')
                    .setDescription('Pour participer au giveaway, vous devez avoir le rôle <@&' + role.id + '>.')
            )
        }
    } if (settings.langue === 'en') {
        if(hasPerm === false || !hasRole == null) {
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('RED')
                    .setDescription('You need `MANAGE_MESSAGES` permissions or a role named ``giveaway`` to use that command.')
                    .setTimestamp()
            )
        }

        if(!args[0]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('RED')
                    .setDescription('Please enter a giveaway duration.\n\n__Example__ : `[prefix]gstart 1m 1 Nitro Classic')
                    .setTimestamp()
            )
        }

        if(!args[1]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('RED')
                    .setDescription('Please, enter the number of winners.\n\n__Example__ : `[prefix]gstart 1m 1 Nitro Classic')
                    .setTimestamp()
            )
        }

        if(!args[2]){
            return message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__ERROR__')
                    .setColor('RED')
                    .setDescription('Please, enter the giveaway gift.\n\n__Example__ : `[prefix]gstart 1m 1 Nitro Classic')
                    .setTimestamp()
            )
        }

        message.delete();

        let embed = await message.channel.send(
            new Discord.MessageEmbed()
                .setTitle('__FINALISATION__')
                .setColor('#2f3136')
                .setDescription('__Do you want to add restrictions ?__\n\n> ``<guildID>``・Need to join a guild to enter.\n> ``<roleID>``・Need a role to enter.\n> ``no``・Launch giveaway !\n\nTo add restrictions, enter the role/guild id after this message.')
        )
        let error = false;
        let id;
        await message.channel.awaitMessages(m => m.author.id === message.author.id, {
            max: 1,
            time: 60000,
            errors: ["time"]
        }).then(collected => {
            id = collected.first().content;
            collected.first().delete()
        }).catch((err) => {
            error = true;
            embed.edit(
                new Discord.MessageEmbed()
                .setTitle('ERREUR')
                .setColor('RED')
                .setDescription("You didn't enter a message. Cancelling giveaway...")
                .setTimestamp()
            );
            return;
        });
        if(error) return;
        if(id.toLowerCase() === 'no'){
            let giveawayMessage = await client.giveawaysManager.start(message.channel, {
                time: ms(args[0]),
                prize: args.slice(2).join(" "),
                winnerCount: parseInt(args[1]),
                messages: {
                    giveaway: "🎉 **GIVEAWAY** 🎉",
                    giveawayEnded: "🎉 **GIVEAWAY TERMINE** 🎉",
                    timeRemaining: `\n\`⏲️\`・Temps restant: **{duration}**!\n\`👑\`・Host par: ${message.author}\n\`🏆\`・Gagnant(s): ${parseInt(args[1])}`,
                    inviteToParticipate: "Réagis avec 🎁 pour participer!",
                    winMessage: "\`🎉\`・Bien joué, {winners}! Vous gagnez **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: `\`⛔\`・Le giveaway à été annulé car il n'y a aucune participation correcte.\n\`👑\`・Host par: ${message.author}`,
                    winners: `\`🏆\`・Gagnant(s)`,
                    endedAt: "Fin le",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false
                    }
                }
            });
            let conditionsServers = require(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')));
            let conditionsRoles = require(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')));
            conditionsServers[giveawayMessage.messageID] = {
                conditionServer: 'Aucune'
            }
            conditionsRoles[giveawayMessage.messageID] = {
                conditionRole: 'Aucune'
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')), JSON.stringify(conditionsServers, null, 2), (err) => {
                if(err) console.log(err)
            });
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')), JSON.stringify(conditionsRoles, null, 2), (err) => {
                if(err) console.log(err)
            });
            return;
        }
        let guild = client.guilds.cache.find(g => g.id === id);
        let role = message.guild.roles.cache.find(r => r.id === id);
        if(!guild && !role){
            return embed.edit(
                new Discord.MessageEmbed()
                    .setTitle('__ERREUR__')
                    .setColor('RED')
                    .setDescription(`I can't find the guild/role.\n\n・__For guilds__: Be sure that I'm on the 2 servers.\n・__For roles__: Be sure you enter the rôle **ID**.`)
            )
        }
        embed.delete()
        let giveawayMessage = await client.giveawaysManager.start(message.channel, {
            time: ms(args[0]),
            prize: args.slice(2).join(" "),
            winnerCount: parseInt(args[1]),
            messages: {
                giveaway: "🎉 **GIVEAWAY** 🎉",
                giveawayEnded: "🎉 **GIVEAWAY ENDED** 🎉",
                timeRemaining: `\n\`⏲️\`・Time left: **{duration}**!\n\`👑\`・Host by: ${message.author}\n\`🏆\`・Winner(s): ${parseInt(args[1])}`,
                inviteToParticipate: "React with 🎁 to enter!",
                winMessage: "\`🎉\`・Congratulations, {winners}! You won **{prize}**!",
                embedFooter: "Giveaways",
                noWinner: `\`⛔\`・There are no correct participations.\n\`👑\`・Host par: ${message.author}`,
                winners: `\`🏆\`・Winners(s)`,
                endedAt: "Fin le",
                units: {
                    seconds: "seconds",
                    minutes: "minutes",
                    hours: "hours",
                    days: "days",
                    pluralS: false
                }
            }
        });

        if(client.guilds.cache.find(g => g.id === id)){
            let guild = client.guilds.cache.find(g => g.id === id);

            let conditionsServers = require(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')));
            conditionsServers[giveawayMessage.messageID] = {
                conditionServer: 'Aucune'
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')), JSON.stringify(conditionsServers, null, 2), (err) => {
                if(err) console.log(err)
            });
            let conditionServer = conditionsServers[giveawayMessage.messageID].conditionServer;

            let chx = guild.channels.cache.filter(chx => chx.type === "text").find(x => x.position === 0);
            let invitation = await chx.createInvite({
                maxAge: 0,
                maxUses: 0
            }).catch(console.error);

            conditionsServers[giveawayMessage.messageID] = {
                conditionServer: guild.id
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')), JSON.stringify(conditionsServers, null, 2), (err) => {
                if(err) console.log(err)
            });

            let conditionsRoles = require(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')));
            conditionsRoles[giveawayMessage.messageID] = {
                conditionRole: 'Aucune'
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')), JSON.stringify(conditionsRoles, null, 2), (err) => {
                if(err) console.log(err)
            });
            
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__CONDITION__')
                    .setColor('#2f3136')
                    .setDescription('To participate, you need to be in [' + guild.name + '](https://discord.gg/' + invitation.code + ')')
            )
        } else if(message.guild.roles.cache.find(r => r.id === id)){
            let role = message.guild.roles.cache.find(r => r.id === id);

            let conditionsRoles = require(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')));
            conditionsRoles[giveawayMessage.messageID] = {
                conditionRole: 'Aucune'
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')), JSON.stringify(conditionsRoles, null, 2), (err) => {
                if(err) console.log(err)
            });
            let conditionRole = conditionsRoles[giveawayMessage.messageID].conditionsRoles;

            conditionsRoles[giveawayMessage.messageID] = {
                conditionRole: role.id
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionRole.json')), JSON.stringify(conditionsRoles, null, 2), (err) => {
                if(err) console.log(err)
            });       
            
            let conditionsServers = require(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')));
            conditionsServers[giveawayMessage.messageID] = {
                conditionServer: 'Aucune'
            }
            fs.writeFile(path.resolve(path.join('..', 'V2.0.0-MUSIQUE/database/conditionsServers.json')), JSON.stringify(conditionsServers, null, 2), (err) => {
                if(err) console.log(err)
            });
            
            message.channel.send(
                new Discord.MessageEmbed()
                    .setTitle('__CONDITION__')
                    .setColor('#2f3136')
                    .setDescription('To enter, you need the <@&' + role.id + '> rôle.')
            )
        }
    }
    
}

module.exports.help = {
    name: "gstart",
    aliases: ['gstart'],
    category: 'giveaway',
    description: "Lancer un giveaway",
    cooldown: 3,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false
  };