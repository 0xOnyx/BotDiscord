const Discord = require("discord.js")
// const superagent = require("superagent")
const arraySort = require("array-sort")
const table = require("table")

module.exports.run = async (client, message, args, settings) => {
        message.delete();

        if (settings.langue === 'fr') {
            let invites = await message.guild.fetchInvites().catch(error => {
            return message.channel.send("Désolé, je n'ai pas la permission de voir les invitations")
        })

        invites = invites.array();


        arraySort(invites, 'uses', { reverse: true})

        let possibleInvites = [['Utilisateur', 'Utilisé']]
        invites.forEach(function(invite) {
            possibleInvites.push([invite.inviter.username, invite.uses])
        })

        let LeaderEmbed = new Discord.MessageEmbed()
        .setColor("#a1ee33")
        .addField("Tableau des invitations", `\`\`\`${table.table(possibleInvites)}\`\`\``)

        message.channel.send(LeaderEmbed)
    }   if (settings.langue === 'en') {
        let invites = await message.guild.fetchInvites().catch(error => {
            return message.channel.send("Sorry, I don't have permission to view the invitations")
        })

        invites = invites.array();


        arraySort(invites, 'uses', { reverse: true})

        let possibleInvites = [['User', 'Used']]
        invites.forEach(function(invite) {
            possibleInvites.push([invite.inviter.username, invite.uses])
        })

        let LeaderEmbed = new Discord.MessageEmbed()
        .setColor("#a1ee33")
        .addField("LeaderBoard of invitations", `\`\`\`${table.table(possibleInvites)}\`\`\``)

        message.channel.send(LeaderEmbed)
    }
}


module.exports.help = {
    name: "invites",
    aliases: ['invites', 'invite'],
    category: 'information',
    description: "Voit le nombre d'invite",
    cooldown: 1,
    usage: '',
    isUserAdmin: false,
    permissions: false,
    args: false
  };