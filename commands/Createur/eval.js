const { MessageEmbed } = require('discord.js');
const { inspect } = require('util');


module.exports.run = async (client, message, args, settings, dbUser) => {
  message.delete();
  if (message.author.id !== '507329636305207308') return message.reply(`Cette commande est exclusivement accessible a LACOSTAR91#3705`);
    
    let evaled;
    try {
      evaled = await eval(args.join(' '));
      let evall = inspect(evaled)
      console.log(inspect(evaled))

      const embed = new MessageEmbed()
      .setDescription(`Entrée:
      \`\`\`${args.join(' ')}\`\`\`
      Résultat:
      \`\`\`${evall}\`\`\``);

      message.channel.send(embed);
    }
    catch (error) {
      let error2 = console.error(error);
      error2;

      const embed = new MessageEmbed()
      .setDescription(`Entrée:
      \`\`\`${args.join(' ')}\`\`\`
      Erreur:
      \`\`\` ${error} \`\`\``);

      message.channel.send(embed);
    }
//  %eval message.guild.members.cache.filter(u => u.presence.activities.state === "discord.gg").map(us => `${us} a un lien dans son status`)
// %eval message.guild.members.cache.filter(user => user.presence.activities.details === "discord.gg").map(user => `${user} a un lien dans son status`)

//   function clean(text) {
//     if (typeof text === "string") 
//       return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
//     return text;
//   }

//   if (message.author.id === "507329636305207308") {
//   const code = args.join(" ");
//   const evaled = eval(code);
//   const cleanCode = await clean(evaled);
//   message.channel.send(cleanCode, { code: "js" });
// } else {
//   message.channel.send("Desoler mais cette commande est accessible seulement a LACOSTAR91#3705")
// }
};

module.exports.help = {
  name: "eval",
  aliases: ['eval', 'e'],
  category: 'createur',
  description: "Tester un code javascript",
  cooldown: 3,
  usage: '<code_to_test>',
  isUserAdmin: false,
  permissions: false,
  args: true
};