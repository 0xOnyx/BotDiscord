const { MessageEmbed, WebhookClient } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
  client.statusHook = new WebhookClient("787639421859528704", "GyQ5sYL5t8SG7w9WWoqae5C1IzXm2UWIgprR926k97lsO5zuUTn-FJFVLyyX-Hmf3-bF");
  message.delete();
  if (settings.langue === 'fr') {
  message.channel.send('Le staff a ete averti, il arrivera dans moins de 48h, veuillez ne pas abusez de cette commande, tout abus sera severement puni')
  } else if (settings.langue === 'en') {
    message.channel.send('The staff has been warned, it will arrive in less than 48 hours, please do not abuse this order, any abuse will be severely punished')
  }
  
  const invitation = await message.channel.createInvite(false, 0, 0, false)

  const embed = new MessageEmbed()
  .setTitle('Un serveur a appeler le staff')
  .setDescription(`**Raison:** ${args.join("")}\n**Lien du serveur:** [invitation](${invitation.url})`)
  .setTimestamp();

  client.statusHook.send(embed)
};

module.exports.help = {
    name: "call-staff",
    aliases: ['call-staff', 'c-s', 'call-staffs'],
    category: 'admin',
    description: "Pour appeler un membre du staff en cas de probleme!",
    cooldown: 86400,
    usage: '<raison>',
    permissions: true,
    isUserAdmin: false,
    args: true
  };