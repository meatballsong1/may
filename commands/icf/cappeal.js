const Discord = require('discord.js')
const {
    Command
} = require('discord.js-commando')

const roblox = require("noblox.js")

module.exports = class credits extends Command {
    constructor(client) {
        super(client, {
            name: 'cappeal',
            description: 'Handles specified target\'s citizenship appeal',
            group: 'icf',
            guildOnly: true,
            memberName: 'cappeal',
            args: [{
                    key: 'target',
                    prompt: 'Who\'s citizenship appeal do you wish to handle?',
                    type: 'string'
                },
                {
                    key: 'option',
                    prompt: 'Do you wish to `accept`/`deny`/`invprivate` this citizenship appeal?',
                    type: 'string',
                    validate: text => {
                        if(text == "accept" || text == "deny" || text == "invprivate") return true
                    }
                }
            ]
        })
    }

    hasPermission(message) {
        if (!message.member.roles.cache.has('1402419162118225930')) return 'Sorry :tired_face: You must be an ICF Member! :raised_hands:'
        return true
    }
    async run(message, args) {
        var webhook = new Discord.WebhookClient('1399570464208195664', 'FmyXxPtlZN27801AYE88MZgImnhA-98IwERTwc0j_qCVImxqHa8JpMfTBvm12dtunCiy')
        var nickname
        if (message.member.nickname) {
            nickname = message.member.nickname
        } else {
            nickname = message.author.username
        }
            var choice
            if (args.option == 'accept') {
                choice = 'Accepted'
            }
            if (args.option == 'deny') {
                choice = 'Denied'
            }
            if (args.option == 'invprivate') {
                choice = 'Inventory Private'
            }
      
      if(choice == "Accepted"){
        const robloxToken = process.env.ROBLOX
        const groupID = "8473766"
        const rankID = 2
        
        await roblox.setCookie(robloxToken);
        
        let playerName 
        let playerID

        playerID = await roblox.getIdFromUsername(args.target);
        playerName = await roblox.getUsernameFromId(playerID)
      
        await roblox.setRank(groupID, playerID, rankID)
      }
            const embed = new Discord.MessageEmbed()
                .setTimestamp()
                .setTitle(`${args.target}'s Citizenship Appeal`)
                .setDescription(choice)
            webhook.send('', {
                username: 'Citizenship',
                embeds: [embed]
            })
            message.reply('Successfully sent your appeal message! 🤗')
    }
}