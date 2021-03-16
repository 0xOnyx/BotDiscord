const { MessageEmbed } = require("discord.js");
const valideFlag = f => f === 'true' || f === 'false' || f === 'null';
const IGNORED = new Set([
 '738332376995856424',
 '746472957504782447',
 '724606870932684870',
 '749679804365930528',
 '750788084253327542',
 '740627030860627992'
])

module.exports.run = (client, message, args, settings) => {
  message.delete();
  let flag = args[1];
  const roleID = args[0];

  if(!isNaN(roleID) && valideFlag(flag.toLowerCase())) {
    if (message.guild.roles.cache.has(roleID)) {
      flag = flag.toLowerCase() === 'true' ? true : (flag.toLowerCase() === 'false' ? false : null);
    const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
    channels.forEach(channel => {
      if(!IGNORED.has(channel.id)) {
            channel.updateOverwrite(roleID, {
              SEND_MESSAGES: !flag,
              CONNECT: !flag
            }).then(g => {
              if (flag) {
                if(!g.name.endsWith('🔒')) {
                  g.edit({ name: g.name + '🔒'})
                }
              } else {
                g.edit({ name: g.name.replace(/\s*🔒/, '')});
              }
            })
            .catch();
      }
    });
    if (flag === true) {
      message.channel.send(`Bloquage des channels effectuer`)
    } else {
      message.channel.send(`Debloquage des channels effectuer`)
    }
    } else {
      message.channel.send('Role invalide.')
    }
  }

//   message.guild.channels.cache.forEach(async (channel, id) => {
//     await channel.updateOverwrite(message.guild.id, {
//         SEND_MESSAGES: false,
//         SPEAK: false
//     })
// })
//   message.channel.send(`Le channel a bien ete lock`)
};

module.exports.help = {
  name: "lock",
  aliases: ['lock'],
  category: 'moderation',
  description: "Lock un channel",
  cooldown: 3,
  usage: '<@role | roleID> <true | false>',
  isUserAdmin: false,
  permissions: true,
  args: true
};