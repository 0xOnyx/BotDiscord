// module.exports = async (client, messageReaction, user, Arole) => {
//   const message = messageReaction.message;
//   const member = message.guild.members.cache.get(user.id);
//   const emoji = messageReaction.emoji.name;
//   // const channel = message.guild.channels.cache.find(c => c.id === '723984992065159258');
//   const memberRole = message.guild.roles.cache.get("724610927156002836");


//   if (member.user.bot) return;

//   if (messageReaction.partial) {
//     await messageReaction.fetch();
//     return;
//   }

//   if (["check"].includes(emoji)) {
//     switch (emoji) {
//       case "check":
//         member.roles.remove(memberRole)
//         break;
//     };
//   };
// }

module.exports = async (client, messageReaction, user) => {
  const message = messageReaction.message;
  // const Arole = await client.getRole(role);
  const member = message.guild.members.cache.get(user.id);
  const emoji = messageReaction.emoji.name;
  // const channel = message.guild.channels.cache.get(Arole.idChannel);
  // const memberRole = message.guild.roles.cache.get(Arole.idRole);

  // console.log(Arole);
  // if (member.user.bot) return;

  // if (messageReaction.partial) {
  //   await messageReaction.fetch();
  //   return;
  // }

  // if ([Arole.emoji].includes(emoji)) {
  //   switch (emoji) {
  //     case Arole.emoji:
  //       member.roles.remove(memberRole)
  //       break;
  //   };
  // };
}