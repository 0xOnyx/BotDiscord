const { MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args, settings) => {  
  message.delete();
  const getSetting = args[0];
  const newSetting = args.slice(1).join(" ");
  const state = args[1];
  const mute_time = args[2];
  // const roleA = args[2];
  const channel = message.mentions.channels.first();
  const statutWel = settings.welcomeChannel === 'none' ? `<:off:778702398767759430>` : `<:on2:778702363610972200> (<#${settings.welcomeChannel}>)`;
  const statutLeave = settings.leaveChannel === 'none' ? `<:off:778702398767759430>` : `<:on2:778702363610972200> (<#${settings.leaveChannel}>)`;
  const statutLog = settings.logChannel === 'none' ? `<:off:778702398767759430>` : `<:on2:778702363610972200> (<#${settings.logChannel}>)`;
  const statutLien = settings.antiLien === 'off' ? `<:off:778702398767759430>` : `<:on2:778702363610972200>`;
  const statutInsulte = settings.antiInsulte === 'off' ? `<:off:778702398767759430>` : `<:on2:778702363610972200>`;
  const statutSpam = settings.antiSpam === 'off' ? `<:off:778702398767759430>` : `<:on2:778702363610972200>`;
  const statutCaptcha = settings.captcha === 'off' ? `<:off:778702398767759430>` : `<:on2:778702363610972200>`;
  const statutCaptchaRole = settings.captchaRole === 'none' ? `(captcha disabled)` : `(<@&${settings.captchaRole}>)`;
  const channelMention = channel ? channel.id : newSetting;
// **antiSpam:** ${statutSpam}
  if (settings.langue === 'fr') {
  if (!getSetting) {
    const embed = new MessageEmbed()
    .setColor('#ffe608')
    .setTitle(`Tableau des configurations du serveur`)
    .setDescription(`
    **prefix:** ${settings.prefix}
    **language:** ${settings.langue}
    **welcomeChannel:** ${statutWel}
    **leaveChannel:** ${statutLeave}
    **logChannel:** ${statutLog}
    **antiLien:** ${statutLien}
    **captcha:** ${statutCaptcha} ${statutCaptchaRole}
    **antiInsulte:** ${statutInsulte} (bientôt)

    **welcomeMessage:** ${settings.welcomeMessage}
    **leaveMessage:** ${settings.leaveMessage}

    **Pour modifier un parametre ci-dessus faites** \`%config <parametre> <nouvelle_configuration>\`. Exemple: \`%config antiLien on\`
    `)
    .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`)
    .setTimestamp();
    message.channel.send(embed)
  } else {
  switch(getSetting) {
    case "language": {
      if (newSetting) {
        if(newSetting === 'en' || newSetting === 'fr') {
          await client.updateGuild(message.guild, { langue: newSetting });
          return message.channel.send(`Language update: \`${settings.langue}\` -> \`${newSetting}\``);
        } else {
          message.channel.send(`To configure the language made \`${settings.prefix}config language <en|fr>\``)
        }
      }
      message.channel.send(`Current language: \`${settings.langue}\``);
      break;
    }
    case "prefix": {
      if (newSetting) {
        message.channel.send(`Prefix mis à jour: \`${settings.prefix}\` -> \`${newSetting}\``);
        return await client.updateGuild(message.guild, { prefix: newSetting });
      }
      message.channel.send(`Prefix actuel: \`${settings.prefix}\``);
      break;
    }
    case "antiLien": {
      if (newSetting) {
        if(newSetting === 'on' || newSetting === 'off') {
        await message.channel.send(`antiLien mis a jour: \`${settings.antiLien}\` -> \`${newSetting}\``);
        return client.updateGuild(message.guild, { antiLien: newSetting });
        } else {
          message.channel.send(`Pour configurer l'antiLien faite \`${settings.prefix}config antiLien <on|off>\``)
        }
      }
      message.channel.send(`Etat actuel de l'antiLien: \`${settings.antiLien}\``);
      break;
    }
    // case "antiSpam": {
    //   if (state) {
    //     if(state === 'on' || state === 'off') {
    //     if(mute_time) {
    //       await message.channel.send(`antiSpam mis a jour: \`${settings.antiSpam}\` -> \`${state}\`, muet pour \`${mute_time} secondes\``);
    //       client.updateGuild(message.guild, { muteTime: ms(`${mute_time}`) });
    //       return client.updateGuild(message.guild, { antiSpam: state });
    //     } else {
    //       return message.channel.send(`Veuillez choisir un temps valide, exemple:\`5s, 10m, 8h, 1d\``)
    //     }
    //     } else {
    //       message.channel.send(`Pour configurer l'antiSpam faite \`${settings.prefix}config antiSpam <on|off> <temps_de_mute>\``)
    //     }
    //   }
    //   message.channel.send(`Etat actuel de l'antiSpam: \`${settings.antiSpam}\``);
    //   break;
    // }
    case "antiInsulte": {
      if (newSetting) {
        if(newSetting === 'on' || newSetting === 'off') {
        await message.channel.send(`antiInsulte mis à jour: \`${settings.antiInsulte}\` -> \`${newSetting}\``);
        return client.updateGuild(message.guild, { antiInsulte: newSetting }); 
        } else {
          message.channel.send(`Pour configurer l'anti insulte faite \`${settings.prefix}config antiInsulte <on|off>\``)
        }
      }
      message.channel.send(`Etat actuel de l'antiInsulte: \`${settings.antiInsulte}\` (L'anti insulte n'est pas au point si vous voyez un mot qui est enlever alors que ce n'est pas une insulte ou un mot laisser alors que c'est insultant veuillez nous contacter.)`);
      break;
    }
    case "welcomeMessage": {
      if (newSetting) {
        message.channel.send(`welcomeMessage mis à jour: \`${settings.welcomeMessage}\` -> \`${newSetting}\``);
        return await client.updateGuild(message.guild, { welcomeMessage: newSetting });
      }
      message.channel.send(`welcomeMessage actuel: \`${settings.welcomeMessage}\``);
      break;
    }
    case "welcomeChannel": {
      if (newSetting) {
        if (channel || newSetting === 'none') {
          message.channel.send(`welcomeChannel mis à jour: \`${settings.welcomeChannel} \` -> \`${newSetting} \``);
          return await client.updateGuild(message.guild, { welcomeChannel: channelMention });
        } else {
          return message.channel.send('Veuillez mentionnez un channel qui servira pour annoncer les gens qui rejoignent le serveur ou mettez \`none\` pour desactiver cette fonctionnalité')
        }
      }
      message.channel.send(`welcomeChannel actuel: \`${settings.welcomeChannel}\``);
      break;
    }
    case "leaveMessage": {
      if (newSetting) {
        await client.updateGuild(message.guild, { leaveMessage: newSetting });
        return message.channel.send(`leaveMessage mis à jour: \`${settings.leaveMessage}\` -> \`${newSetting}\``);
      }
      message.channel.send(`leaveMessage actuel: \`${settings.leaveMessage}\``);
      break;
    }
    case "leaveChannel": {
      if (newSetting) {
        if (channel || newSetting === 'none') {
          message.channel.send(`leaveChannel mis à jour: \`${settings.leaveChannel} \` -> \`${newSetting} \``);
          return await client.updateGuild(message.guild, { leaveChannel: channelMention });
        } else {
          return message.channel.send('Veuillez mentionnez un channel qui servira pour annoncer les gens qui quittent le serveur ou mettez \`none\` pour desactiver cette fonctionnalité')
        }
      }
      message.channel.send(`leaveChannel actuel: \`${settings.leaveChannel}\``);
      break;
    }
    case "logChannel": {
      if (newSetting) {
        if (channel || newSetting === 'none') {
          message.channel.send(`logChannel mis à jour: \`${settings.logChannel}\` -> \`${newSetting}\``);
          return await client.updateGuild(message.guild, { logChannel: channelMention });
        } else {
          return message.channel.send('Veuillez mentionnez un channel qui servira de channel de logs ou mettez \`none\` pour desactiver cette fonctionnalité')
        }
      }
      message.channel.send(`logChannel actuel: \`${settings.logChannel}\``);
      break;
    }
    // ! A faire tres vite
    case "captcha": {
      if (state) {
        if(state === 'on') {
          // if (role) {
            // message.channel.send(`Veuillez mentionner un rôle a donner lors de la validation du captcha. **Veuillez mentionner seulement un rôle !**`)
            // await message.channel.awaitMessages(m => m.author.id === message.author.id, {
            //   max: 1,
            //   time: 20000,
            //   errors: ["time"]
            // }).then(async collected => {
              // console.log(collected)
              // const role = collected.message.mentions.roles.first();
              // if(!role){
              // return message.channel.send(`Veuillez recommencer la commande et mentionner un rôle`)
              // } else {
              //   message.channel.send(`Captcha mis à jour: \`${settings.captcha}\` -> \`${state}\`, rôle: ${message.guild.roles.cache.get(collected.slice(3, -1)).name}`);
              // await client.updateGuild(message.guild, { captcha: state });
              // return await client.updateGuild(message.guild, { captchaRole: collected.slice(3, -1) });
              // }
            // })
            // .catch((err) => {
            //       const embed = new MessageEmbed()
            //       .setTitle('ERREUR')
            //       .setColor('RED')
            //       .setDescription("Temps ecouler vous n'avez pas entrer de rôle. Annulation...")
            //       .setTimestamp()
            //       return message.channel.send(embed)
            // })
          // } else {
          //   message.channel.send("Veuillez mentionner un role a donner aux arrivant")
          // }

          if (!args[1]) {
            return message.channel.send(`Veuillez mentionner un role a donner lors de la validation du captcha. Utilisation: \`${settings.prefix}config captcha <on|off> <role_a_donner>\``)
          } else if (!message.mentions.roles.first()) {
            return message.channel.send(`Veuillez mentionner un role a donner lors de la validation du captcha. Utilisation: \`${settings.prefix}config captcha <on|off> <role_a_donner>\``)
          } else {
            const role = message.mentions.roles.first();

            message.channel.send(`Captcha mis à jour: \`${settings.captcha}\` -> \`${state}\`, rôle: \`${role.name}\``);
            await client.updateGuild(message.guild, { captcha: state });
            return await client.updateGuild(message.guild, { captchaRole: role.id });
          }


        } else if(state === 'off') {
          await client.updateGuild(message.guild, { captcha: state });
          return message.channel.send(`Captcha mis à jour: \`${settings.captcha}\` -> \`${state}\``);
        
        
        } else {
          message.channel.send(`Pour configurer le captcha faite \`${settings.prefix}config captcha <on|off> <role_a_donner>\``)
        }
      }
      message.channel.send(`Etat actuel du captcha: \`${settings.captcha}\``);
      break;
    }
    // ! A faire tres vite
    default :
        return message.channel.send(`<:no_check:730881778281218159> Veuillez choisir entre \`prefix, language, welcomeChannel, leaveChannel, logChannel, welcomeMessage, leaveMessage and SOON antiLien, antiInsulte, captcha, captchaRole,\``)
        break;
  }
}



//  **antiSpam:** ${statutSpam}

} else if (settings.langue === 'en') {
  if (!getSetting) {
    const embed = new MessageEmbed()
  .setColor('#ffe608')
  .setTitle(`Server configuration table`)
  .setDescription(`
  **prefix:** ${settings.prefix}
  **language:** ${settings.langue}
  **welcomeChannel:** ${statutWel}
  **leaveChannel:** ${statutLeave}
  **logChannel:** ${statutLog}
  **antiLien:** ${statutLien}
  **captcha:** ${statutCaptcha} ${statutCaptchaRole}
  **antiInsulte:** ${statutInsulte} (SOON)

  **welcomeMessage:** ${settings.welcomeMessage}
  **leaveMessage:** ${settings.leaveMessage}

  **To modify a parameter above do** \`%config <parametre> <new_configuration>\`. Example: \`%config antiLien on\`
  `)
  .setFooter(`${message.author.tag}`, `${message.author.avatarURL()}`)
  .setTimestamp();
  message.channel.send(embed)
} else {
switch(getSetting) {
  case "language": {
    if (newSetting) {
      if(newSetting === 'en' || newSetting === 'fr') {
        await client.updateGuild(message.guild, { langue: newSetting });
        return message.channel.send(`Language update: \`${settings.langue}\` -> \`${newSetting}\``);
      } else {
        message.channel.send(`To configure the language made \`${settings.prefix}config language <en|fr>\``)
      }
    }
    message.channel.send(`Current language: \`${settings.langue}\``);
    break;
  }
  case "prefix": {
    if (newSetting) {
      message.channel.send(`Prefix update: \`${settings.prefix}\` -> \`${newSetting}\``);
      return await client.updateGuild(message.guild, { prefix: newSetting });
    }
    message.channel.send(`Current prefix: \`${settings.prefix}\``);
    break;
  }
  case "antiLien": {
    if (newSetting) {
      if(newSetting === 'on' || newSetting === 'off') {
      await message.channel.send(`antiLien update: \`${settings.antiLien}\` -> \`${newSetting}\``);
      return client.updateGuild(message.guild, { antiLien: newSetting });
      } else {
        message.channel.send(`To configure the anti link made \`${settings.prefix}config antiLien <on|off>\``)
      }
    }
    message.channel.send(`Current state of the antiLien: \`${settings.antiLien}\``);
    break;
  }
       case "antiInsulte": {
          if (newSetting) {
            if(newSetting === 'on' || newSetting === 'off') {
            await message.channel.send(`antiInsulte update: \`${settings.antiInsulte}\` -> \`${newSetting}\``);
            return client.updateGuild(message.guild, { antiInsulte: newSetting }); 
            } else {
              message.channel.send(`To configure the anti-insult made \`${settings.prefix}config antiInsulte <on|off>\``)
            }
          }
          message.channel.send(`Current state of antiInsulte: \`${settings.antiInsulte}\` (The anti-insult is not developed if you see a word that is removed when it is not an insult or a word left while it is insulting please contact us.)`);
          break;
        }   
  case "welcomeMessage": {
    if (newSetting) {
      message.channel.send(`welcomeMessage update: \`${settings.welcomeMessage}\` -> \`${newSetting}\``);
      return await client.updateGuild(message.guild, { welcomeMessage: newSetting });
    }
    message.channel.send(`Current welcomeMessage: \`${settings.welcomeMessage}\``);
    break;
  }
  case "welcomeChannel": {
    if (newSetting) {
      if (channel || newSetting === 'none') {
        message.channel.send(`welcomeChannel update: \`${settings.welcomeChannel} \` -> \`${newSetting} \``);
        return await client.updateGuild(message.guild, { welcomeChannel: channelMention });
      } else {
        return message.channel.send('Please mention a channel which will be used to announce people who join the server or put \`none\` to deactivate this feature')
      }
    }
    message.channel.send(`Current welcomeChannel: \`${settings.welcomeChannel}\``);
    break;
  }
  case "leaveMessage": {
    if (newSetting) {
      await client.updateGuild(message.guild, { leaveMessage: newSetting });
      return message.channel.send(`leaveMessage update: \`${settings.leaveMessage}\` -> \`${newSetting}\``);
    }
    message.channel.send(`Current leaveMessage: \`${settings.leaveMessage}\``);
    break;
  }
  case "leaveChannel": {
    if (newSetting) {
      if (channel || newSetting === 'none') {
        message.channel.send(`leaveChannel update: \`${settings.leaveChannel} \` -> \`${newSetting} \``);
        return await client.updateGuild(message.guild, { leaveChannel: channelMention });
      } else {
        return message.channel.send('Please mention a channel which will be used to announce people who join the server or put \`none\` to deactivate this feature')
      }
    }
    message.channel.send(`Current leaveChannel: \`${settings.leaveChannel}\``);
    break;
  }
  case "logChannel": {
    if (newSetting) {
      if (channel || newSetting === 'none') {
        message.channel.send(`logChannel update: \`${settings.logChannel}\` -> \`${newSetting}\``);
        return await client.updateGuild(message.guild, { logChannel: channelMention });
      } else {
        return message.channel.send('Please mention a channel that will serve as a log channel or put \`none\` to deactivate this feature')
      }
    }
    message.channel.send(`Current logChannel: \`${settings.logChannel}\``);
    break;
  }
  case "captcha": {
    if (state) {
      if(state === 'on') {
        // if (role) {
          // message.channel.send(`Veuillez mentionner un rôle a donner lors de la validation du captcha. **Veuillez mentionner seulement un rôle !**`)
          // await message.channel.awaitMessages(m => m.author.id === message.author.id, {
          //   max: 1,
          //   time: 20000,
          //   errors: ["time"]
          // }).then(async collected => {
            // console.log(collected)
            // const role = collected.message.mentions.roles.first();
            // if(!role){
            // return message.channel.send(`Veuillez recommencer la commande et mentionner un rôle`)
            // } else {
            //   message.channel.send(`Captcha mis à jour: \`${settings.captcha}\` -> \`${state}\`, rôle: ${message.guild.roles.cache.get(collected.slice(3, -1)).name}`);
            // await client.updateGuild(message.guild, { captcha: state });
            // return await client.updateGuild(message.guild, { captchaRole: collected.slice(3, -1) });
            // }
          // })
          // .catch((err) => {
          //       const embed = new MessageEmbed()
          //       .setTitle('ERREUR')
          //       .setColor('RED')
          //       .setDescription("Temps ecouler vous n'avez pas entrer de rôle. Annulation...")
          //       .setTimestamp()
          //       return message.channel.send(embed)
          // })
        // } else {
        //   message.channel.send("Veuillez mentionner un role a donner aux arrivant")
        // }

        if (!args[1]) {
          return message.channel.send(`Veuillez mentionner un role a donner lors de la validation du captcha. Utilisation: \`${settings.prefix}config captcha <on|off> <role_a_donner>\``)
        } else if (!message.mentions.roles.first()) {
          return message.channel.send(`Veuillez mentionner un role a donner lors de la validation du captcha. Utilisation: \`${settings.prefix}config captcha <on|off> <role_a_donner>\``)
        } else {
          const role = message.mentions.roles.first();

          message.channel.send(`Captcha mis à jour: \`${settings.captcha}\` -> \`${state}\`, rôle: \`${role.name}\``);
          await client.updateGuild(message.guild, { captcha: state });
          return await client.updateGuild(message.guild, { captchaRole: role.id });
        }


      } else if(state === 'off') {
        await client.updateGuild(message.guild, { captcha: state });
        return message.channel.send(`Captcha mis à jour: \`${settings.captcha}\` -> \`${state}\``);
      
      
      } else {
        message.channel.send(`Pour configurer le captcha faite \`${settings.prefix}config captcha <on|off> <role_a_donner>\``)
      }
    }
    message.channel.send(`Etat actuel du captcha: \`${settings.captcha}\``);
    break;
  }
  default :
      return message.channel.send(`<:no_check:730881778281218159> Choose between \`prefix, language, welcomeChannel, leaveChannel, logChannel, welcomeMessage, leaveMessage and SOON antiLien, antiInsulte, captcha, captchaRole,\``)
      break;
}
}
}
};
// :BadgeBooster1Mois:  :BadgeBooster2Mois: :BadgeBooster3Mois: :BadgeBooster6Mois: :BadgeBooster9Mois: :BadgeBooster12Mois: :BadgeBooster15Mois: :BadgeBooster18Mois: 
 
module.exports.help = {
  name: "config",
  aliases: ['config'],
  category: 'admin',
  description: "Modifier des fonction du bot comme le prefix ou l'anti-lien",
  cooldown: 3,
  usage: '<parametre> <modification>',
  isUserAdmin: false,
  permissions: true,
  args: false
};