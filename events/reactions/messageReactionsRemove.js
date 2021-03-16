module.exports = async (client, messageReaction, user) => {
  const message = messageReaction.message;
  const member = message.guild.members.cache.get(user.id);
  const emoji = messageReaction.emoji.name;
  const channel = message.guild.channels.cache.find(c => c.id === '723984992065159258');
  const memberRole = message.guild.roles.cache.get("724610927156002836");

  if (member.user.bot) return;

  if (messageReaction.partial) {
    await messageReaction.fetch();
    return;
  }

  if (["check"].includes(emoji) && message.channel.id === channel.id) {
    switch (emoji) {
      case "check":
        member.roles.remove(memberRole)
        client.channels.cache.get('724606870932684870').send(`Le rôle ${memberRole.name} a été ajouté avec succès a ${user.tag}!`);
        break;
    };
  };
}