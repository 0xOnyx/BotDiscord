module.exports = async (client, messageReaction, user) => {
  const message = messageReaction.message;
  // const Arole = await client.getRole(role);
  const member = message.guild.members.cache.get(user.id);
  const emoji = messageReaction.emoji.name;
  const channel = message.guild.channels.cache.get('000');
  const memberRole = message.guild.roles.cache.get('000');

  // console.log(Arole.guildID)
  // if (member.user.bot) return;

  // if (messageReaction.partial) {
  //   await messageReaction.fetch();
  //   return;
  // }

  // if ([Arole.emoji].includes(emoji)) {
  //   switch (emoji) {
  //     case Arole.emoji:
  //       member.roles.add(memberRole)
  //       break;
  //   };
  // };
}