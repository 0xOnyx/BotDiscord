const { MessageEmbed, Collection } = require("discord.js");

module.exports.run = async (client, message, args, settings) => {
    message.delete();
    let channel = message.mentions.channels.first();

  if (settings.langue === 'fr') {
  if (!channel)
      return message.channel.send(`Vous n'avez pas mentionner de channel!`);

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor("#ad14da")
    .setDescription(args.splice(1).join(" "))
    .addField("Répondre à la question ci-dessus à l'aide d'une des réactions:",
    `
    🟩 - Pour (Oui)
    🟦 - Neutre/Je sais pas
    🟥 - Contre (Non)
    `)
    .setTimestamp()
    .setFooter("N'hésitez pas à envoyer un autre sondage")

  message.channel.send(`Le sondage a bien ete envoyer sur le channel ${channel}`)
  const poll = await channel.send(embed);
  await poll.react("🟩");
  await poll.react("🟦");
  await poll.react("🟥");

  } else if (settings.langue === 'en') {
    if (!channel)
      return message.channel.send(`You didn't mention a channel!`);

  const embed = new MessageEmbed()
    .setAuthor(message.author.username, message.author.displayAvatarURL())
    .setColor("#ad14da")
    .setDescription(args.splice(1).join(" "))
    .addField("Answer the question above using one of the reactions:",
    `
    🟩 - Yes
    🟦 - I don't know
    🟥 - No
    `)
    .setTimestamp()
    .setFooter("Feel free to send another survey")

  message.channel.send(`Le sondage a bien ete envoyer sur le channel ${channel}`)
  const poll = await channel.send(embed);
  await poll.react("🟩");
  await poll.react("🟦");
  await poll.react("🟥");
  }
};

module.exports.help = {
  name: "poll",
  aliases: ['poll', 'sondage'],
  category: 'admin',
  description: `Creer un sondage`,
  cooldown: 3,
  usage: '<channel> <sondage>',
  isUserAdmin: false,
  permissions: true,
  args: true
};

 // message.delete();
//   const userCreatedPolls = new Map();

//   switch(args[0]) {
//     case "create":{
//   if(userCreatedPolls.has(message.author.id)) {
//       message.channel.send("You already have a poll going on right now.");
//       return;
//   }
//   message.channel.send("Enter options. Max 5. Type done when finished.");
//   let filter = m => {
//       if(m.author.id === message.author.id) {
//           if(m.content.toLowerCase() === 'done') collector.stop();
//           else return true;
//       }
//       else return false;
//   }
//   let collector = message.channel.createMessageCollector(filter, { maxMatches: 5 });
//   let pollOptions = await getPollOptions(collector);
//   if(pollOptions.length < 2) {
//       message.channel.send("Not enough options, must contain 2!");
//       return;
//   }
//   let embed = new MessageEmbed();
//   embed.setTitle("Your Poll");
//   embed.setDescription(pollOptions.join("\n"));
//   let confirm = await message.channel.send(embed);
  
//   await confirm.react('✅');
//   await confirm.react('❎');

//   let reactionFilter = (reaction, user) => (user.id === message.author.id) && !user.bot;
//   let reaction = (await confirm.awaitReactions(reactionFilter, { max: 1 })).first();
//   if(reaction.emoji.name === '✅') {
//       message.channel.send("Poll will begin in 1 seconds.");
//       await delay(1000);
//       message.channel.send("Vote now!");
//       let userVotes = new Map();
//       let pollTally = new Collection(pollOptions.map(o => [o, 0]));
//       let pollFilter = m => !m.bot;
//       let voteCollector = message.channel.createMessageCollector(pollFilter, {
//           time: 10000
//       });
//       userCreatedPolls.set(message.author.id, voteCollector);
//       await processPollResults(voteCollector, pollOptions, userVotes, pollTally);
//       let max = Math.max(...pollTally.array());
//       console.log(pollTally.entries());
//       let entries = [...pollTally.entries()];
//       let winners = [];
//       let embed = new MessageEmbed();
//       let desc = '';
//       entries.forEach(entry => entry[1] === max ? winners.push(entry[0]) : null);
//       entries.forEach(entry => desc  += entry[0] + " received " + entry[1] + " votes(s)\n");
//       embed.setDescription(desc);

//       if(winners.length === 1) {
//           message.channel.send(winners[0] + " is the winner!", embed);
//       }
//       else {
//           message.channel.send("We have a draw!", embed);
//       }
//   }   
//   else if(reaction.emoji.name === '❎') {
//       message.channel.send("Poll cancelled.");
//   }


// function processPollResults(voteCollector, pollOptions, userVotes, pollTally) {
// return new Promise((resolve, reject) => {
//   voteCollector.on('collect', msg => {
//       let option = msg.content.toLowerCase();
//       if(!userVotes.has(msg.author.id) && pollOptions.includes(option)) {
//           userVotes.set(msg.author.id, msg.content);
//           let voteCount = pollTally.get(option);
//           pollTally.set(option, ++voteCount);
//       }
//   });
//   voteCollector.on('end', collected => {
//       console.log("Collected " + collected.size + " votes.");
//       resolve(collected);
//   })
// });
// }

// function getPollOptions(collector) {
// return new Promise((resolve, reject) => {
//   collector.on('end', collected => resolve(collected.map(m => m.content.toLowerCase())));
// });
// }

// function delay(time) {
// return new Promise((resolve, reject) => {
//   setTimeout(() => {
//       resolve();
//   }, time)
// })
// }
// break;
//   }
// case "stop": {
// if(userCreatedPolls.has(message.author.id)) {
// console.log("Trying to stop poll.");
// userCreatedPolls.get(message.author.id).stop();
// userCreatedPolls.delete(message.author.id);
// }
// else {
// message.channel.send("You don't have a poll going on right now.");
// }
// }
// }