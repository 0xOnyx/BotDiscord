module.exports.run = (client, message, args, settings) => {
    message.delete();

    if (settings.langue === 'en') {
    if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.channel.send(':x: You need to have the manage messages permissions to stop giveaways or a role with the name is Giveaways.');
    }

    // If no message ID or giveaway name is specified
    if(!args[0]){
        return message.channel.send(':x: You have to specify a valid message ID!');
    }

    // try to found the giveaway with prize then with ID
    let giveaway = 
    // Search with giveaway prize
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    // Search with giveaway ID
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    // If no giveaway was found
    if(!giveaway){
        return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') + '`.');
    }

    // Edit the giveaway
    client.giveawaysManager.edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
    })
    // Success message
    .then(() => {
        // Success message
        message.channel.send('Giveaway will end in less than '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' seconds...');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
            message.channel.send('This giveaway is already ended!');
        } else {
            console.error(e);
            message.channel.send('An error occured...');
        }
    });
} if (settings.langue === 'fr') {
 if(!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
    return message.channel.send(':x: Vous devez disposer des autorisations de gestion des messages pour arreter les giveaway ou un rôle portant le nom est Giveaways.');
}

// If no message ID or giveaway name is specified
if(!args[0]){
    return message.channel.send(':x: Vous devez mettre un ID de message valide!');
}

// try to found the giveaway with prize then with ID
let giveaway = 
// Search with giveaway prize
client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
// Search with giveaway ID
client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

// If no giveaway was found
if(!giveaway){
    return message.channel.send('Impossible de trouver un giveaway pour `'+ args.join(' ') + '`.');
}

// Edit the giveaway
client.giveawaysManager.edit(giveaway.messageID, {
    setEndTimestamp: Date.now()
})
// Success message
.then(() => {
    // Success message
    message.channel.send('Le giveaway se terminera dans moins de '+(client.giveawaysManager.options.updateCountdownEvery/1000)+' secondes...');
})
.catch((e) => {
    if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is already ended.`)){
        message.channel.send('Ce giveaway est déjà terminé!');
    } else {
        console.error(e);
        message.channel.send("Une erreur s'est produite...");
    }
});
}
};

module.exports.help = {
    name: "gstop",
    aliases: ['gstop'],
    category: 'giveaway',
    description: "Stop le giveaway",
    cooldown: 3,
    usage: '<message_ID>',
    isUserAdmin: false,
    permissions: false,
    args: false
  };