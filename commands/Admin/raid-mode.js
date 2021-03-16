module.exports.run = async (client, message, args, settings) => {
    message.delete();
    if (settings.langue === 'fr') {
    if (!args[0]) {
        return message.channel.send(`Statut actuel du raid mode: \`${settings.raidMode}\``);
    } 
    // if (args[0] !== 'on' || args[0] !== 'off') {
    //          return message.channel.send(`Veuillez choisir entre \`on\` ou \`off\``)
    //     } 
    switch(args[0]) {
        case "on": {
              await client.updateGuild(message.guild, { raidMode: args[0] });
              message.channel.send(`Raid mode mis a jour: \`${settings.raidMode}\` -> \`${args[0]}\``);
              break;
          }
          case "off": {
            await client.updateGuild(message.guild, { raidMode: args[0] });
            message.channel.send(`Raid mode mis a jour: \`${settings.raidMode}\` -> \`${args[0]}\``);
            break;
        }
        default :
        return message.channel.send(`<:no_check:730881778281218159> Choisis entre on et off`)
        break;
    }
  } if (settings.langue === 'en') {
    if (!args[0]) {
        return message.channel.send(`State of raid mode: \`${settings.raidMode}\``);
    } 
    // if (args[0] !== 'on' || args[0] !== 'off') {
    //          return message.channel.send(`Veuillez choisir entre \`on\` ou \`off\``)
    //     } 
    switch(args[0]) {
        case "on": {
              await client.updateGuild(message.guild, { raidMode: args[0] });
              message.channel.send(`Raid mode update: \`${settings.raidMode}\` -> \`${args[0]}\``);
              break;
          }
          case "off": {
            await client.updateGuild(message.guild, { raidMode: args[0] });
            message.channel.send(`Raid mode update: \`${settings.raidMode}\` -> \`${args[0]}\``);
            break;
        }
        default :
        return message.channel.send(`<:no_check:730881778281218159> Choose between on and off`)
        break;
    }
  }
}

module.exports.help = {
    name: "raid-mode",
    aliases: ['raid-mode', 'raidMode', 'r-m'],
    category: 'admin',
    description: "Active ou desactive le mode raid",
    cooldown: 1,
    usage: '<on || off>',
    isUserAdmin: false,
    permissions: true,
    args: false
  };