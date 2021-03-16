const moment = require("moment");

module.exports.run = async (client, message, args, settings) => {
  // const regex = ('/\d\g[0-9]/');
  // const ID = 5524586255665;
  // const rep = regex.match(ID);
  message.delete();

  if (settings.langue === 'fr') {
  if (!args[0]) {
  const emoji2 = message.guild.emojis.cache.map(e => e.toString());
        const reste = emoji2.splice(0, 25);
        message.channel.send(`${reste.join(`, `)}${emoji2.length > 0 ? ` et ${emoji2.length} autre emoji, pour avoir des infos sur un emoji faites \`%emoji (l'emoji)\`` : ''}`).catch(error => {
          return message.channel.send(`**Si les emoji ne s'envoie pas cela est dû a une de ces deux choses:**\n- Votre serveur n'a pas d'emoji personaliser\n- Le nom total des emoji fait plus de 2000 caractères`)
        }
    );
  } else {
    try {
      const emoji = args[0];
      const IDE = emoji.slice(-19, -1);
      const emojiO = message.guild.emojis.resolve(IDE);
        const emojiID = message.guild.emojis.resolveID(IDE);
        const emojiIdentifier = message.guild.emojis.resolveIdentifier(IDE);
        const emojiName = message.guild.emojis.resolve(IDE).name;
        const emojiURL = message.guild.emojis.resolve(IDE).url;
        const emojiCreated = moment.utc(message.guild.emojis.resolve(IDE).createdAt).format('DD/MM/YYYY hh:mm:ss');

        message.channel.send(`**Nom:** \`${emojiName}\`\n**Previsualisation:** ${emojiO}\n**ID:** \`${emojiID}\`\n**Identifier:** \`${emojiIdentifier}\`\n**Date de creation:** \`${emojiCreated}\``);
        await message.channel.send(emojiURL);
    } catch {
      try {
        const emoji = args[0];
        const ID = emoji.slice(0, 18);
        const emojiO = message.guild.emojis.resolve(ID);
        const emojiID = message.guild.emojis.resolveID(ID);
        const emojiIdentifier = message.guild.emojis.resolveIdentifier(ID);
        const emojiName = message.guild.emojis.resolve(ID).name;
        const emojiURL = message.guild.emojis.resolve(ID).url;
        const emojiCreated = message.guild.emojis.resolve(ID).createdAt;

        message.channel.send(`**Nom:** \`${emojiName}\`\n**Previsualisation:** ${emojiO}\n**ID:** \`${emojiID}\`\n**Identifier:** \`${emojiIdentifier}\`\n**Date de creation:** \`${emojiCreated}\``);
        await message.channel.send(emojiURL);
      } catch {
        message.channel.send(`Cet emoji n'existe pas, verifier bien:\n\t- Que c'est bien un emoji personaliser qui vient de ce serveur\n\t- L'ID de l'emoji et le nom de l'emoji\n\t- Et la forme de l'emoji: \`<:nom_de_l'emoji:ID_de_l'emoji>\` ou \`<a:nom_de_l'emoji:ID_de_l'emoji>\` pour un emoji\n\t animé`)
      }
    }
  }
} if (settings.langue === 'en') {
  if (!args[0]) {
    const emoji2 = message.guild.emojis.cache.map(e => e.toString());
          const reste = emoji2.splice(0, 25);
          message.channel.send(`${reste.join(`, `)}${emoji2.length > 0 ? ` and ${emoji2.length} other emoji, to get info on an emoji do \`%emoji (the emoji)\`` : ''}`).catch(error => {
            return message.channel.send(`**If the emoji does not send it is due to one of these two things:**\n- Your server does not have a personalized emoji\n- The total name of the emoji is more than 2000 characters`)
          }
      );
    } else {
      try {
        const emoji = args[0];
        const IDE = emoji.slice(-19, -1);
        const emojiO = message.guild.emojis.resolve(IDE);
          const emojiID = message.guild.emojis.resolveID(IDE);
          const emojiIdentifier = message.guild.emojis.resolveIdentifier(IDE);
          const emojiName = message.guild.emojis.resolve(IDE).name;
          const emojiURL = message.guild.emojis.resolve(IDE).url;
          const emojiCreated = moment.utc(message.guild.emojis.resolve(IDE).createdAt).format('MM/DD/YYYY hh:mm:ss');
  
          message.channel.send(`**Name:** \`${emojiName}\`\n**Preview:** ${emojiO}\n**ID:** \`${emojiID}\`\n**Identifier:** \`${emojiIdentifier}\`\n**Created at:** \`${emojiCreated}\``);
          await message.channel.send(emojiURL);
      } catch {
        try {
          const emoji = args[0];
          const ID = emoji.slice(0, 18);
          const emojiO = message.guild.emojis.resolve(ID);
          const emojiID = message.guild.emojis.resolveID(ID);
          const emojiIdentifier = message.guild.emojis.resolveIdentifier(ID);
          const emojiName = message.guild.emojis.resolve(ID).name;
          const emojiURL = message.guild.emojis.resolve(ID).url;
          const emojiCreated = message.guild.emojis.resolve(ID).createdAt;
  
          message.channel.send(`**Name:** \`${emojiName}\`\n**Preview:** ${emojiO}\n**ID:** \`${emojiID}\`\n**Identifier:** \`${emojiIdentifier}\`\n**Created at:** \`${emojiCreated}\``);
          await message.channel.send(emojiURL);
        } catch {
          message.channel.send(`This emoji does not exist, please check:\n\t- That it is indeed a personalized emoji that comes from this server\n\t- The emoji ID and the name of the emoji\n\t- And the shape of the emoji: \`<:nom_de_l'emoji:ID_de_l'emoji>\` or \`<a:nom_de_l'emoji:ID_de_l'emoji>\` for an animated emoji`)
        }
      }
    }
}
};

module.exports.help = {
  name: "emoji",
  aliases: ['emoji', 'emojis'],
  category: 'information',
  description: "Renvoie les emoji d'un serveur!",
  cooldown: 3,
  usage: '',
  permissions: false,
  isUserAdmin: false,
  args: false
};