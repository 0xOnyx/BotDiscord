module.exports.run = async (client, message) => {
    message.delete();
    if (message.author.id === `507329636305207308`) {
        await message.channel.send("<:reglage:730384004125294662> Le bot redemarre !");
        process.exit();
    } else {
        message.channel.send(`Cette commande est exclusivement reserver au createur du bot LACOSTAR91#3705`)
    }
};

module.exports.help = {
    name: "reload",
    aliases: ['reload'],
    category: 'createur',
    description: "Redemarre le bot !",
    cooldown: 3,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false
  };