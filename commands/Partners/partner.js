const { MessageEmbed } = require("discord.js");

module.exports.run = (client, message, args, settings) => {
  message.delete();
message.channel.send("Bonjour à tous !👋\nLa détente des stressés est un serveur **ouvert à tout le monde** même si de base il s'agit d'un serveur dédié aux personnes stressée, angoissées, phobiques, anxieuses, dépressives, ayant des tocs...qui a été créer afin de discuter, de s'entraider, de jouer à des jeux...\nIl y a des salons spécifiques pour l'aide comme des salons de discussions, des salons avec des musiques relaxantes, pour méditer...\nMais aussi des salons de détente comme de la discussion générale, discussions sur des jeux, des livres, la musique... 👍\nIl y a également des petits jeux, pour s'amuser.🎲\nDes animations à gains débutent ! 🎉\nPetit à petit, le serveur évolue et se développe, grâce à l'équipe et grâce aux membres !  \nToute idée est bonne à prendre pour l'amélioration de ce serveur.   \nActuellement, nous cherchons des membres **actifs** pour notre Staff ! 😉")
if (settings.langue === 'fr') {
const embed = new MessageEmbed()
.setTitle("Partenariat avec \`La détente des stressés\`")
.setDescription("Si vous êtes intéressé, voici le lien : [Invitation](https://discord.gg/terXAe6) 💪😉 ")
.setFooter('Partenariat avec YZZY ? Viens dans le serveur support et mp LACOSTAR91#3705')
.setTimestamp();

message.channel.send(embed)
} if (settings.langue === 'en') {
  const embed = new MessageEmbed()
  .setTitle("Partnership with \`La détente des stressés\`")
  .setDescription("If you are interested, here is the link: [Invite](https://discord.gg/terXAe6) 💪😉 ")
  .setFooter('Partnership with YZZY? Come to the support server and dm LACOSTAR91#3705')
  .setTimestamp();
  
  message.channel.send(embed)
}
}
module.exports.help = {
    name: "partners",
    aliases: ['partners', 'partner'],
    category: 'partners',
    description: "Partenariat avec \`La détente des stressés\`",
    cooldown: 10,
    usage: ``,
    isUserAdmin: false,
    permissions: false,
    args: false
  };