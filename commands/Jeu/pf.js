
module.exports.run = (client, message, args, settings) => {
  message.delete();

  if (settings.langue === 'fr') {
  let array = [ 'pile', 'face' ]

if (!array.includes(args[0])) return message.channel.send(`Veuillez choisir entre pile et face !`)
if (args.length > 1) return message.channel.send(`Veuillez choisir entre pile et face !`)

let bot_choice = array[Math.floor(Math.random() * array.length)]

if (args[0] === bot_choice) {
  return message.channel.send("Vous avez gagner !")
} else {
  return message.channel.send("Vous avez perdu !")
}
  } if (settings.langue === 'en') {
    let array = [ 'heads', 'tails' ]

    if (!array.includes(args[0])) return message.channel.send(`Please choose between heads and tails !`)
    if (args.length > 1) return message.channel.send(`Please choose between heads and tails !`)
    
    let bot_choice = array[Math.floor(Math.random() * array.length)]
    
    if (args[0] === bot_choice) {
      return message.channel.send("You won !")
    } else {
      return message.channel.send("You lost !")
    }
  }
};

module.exports.help = {
  name: "pf",
  aliases: ['pf', 'heads', 'tails'],
  category: 'jeu',
  description: "Jeux pile ou face !",
  cooldown: 1,
  usage: '<côté choisis>',
  isUserAdmin: false,
  permissions: false,
  args: true
};