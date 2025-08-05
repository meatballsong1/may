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
        if (!message.member.roles.has('781717353057484822')) return 'Sorry :tired_face: You must be an ICF Member! :raised_hands:'
        return true
    }
    async run(message, args) {
        var webhook = new Discord.WebhookClient('783140782688305192', '2fopOMR_ZGCOMhQ6mMJIYBO80b--B-q6BOU1vB2_X-W_z9nLiOlnLi2UP62m8r29O3uw')
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
        const robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_602349C0ABA8C13009D7B0C7A973B15F7934667F2292EE9E9C5E45D8C8782B4BC6972BC16B4347E50B4350362F50A001F328A04E95CDBF69A3AB206E4D4B2B65864E5D54248CCE7D066AA70F804EABB62D8710EBFECEB45963A575C6E256B96D6CE7DE66F121C3ED68FE02F6B09AE10F7D0FDABBF2E27152A61AB8FB5559FB9908C0FEAE50E1E3968E6826AE3192CE3C9A805C1FCE59AC37180B9F1247B55D2E0C3FAEF7D89289AAC59028813B958F32DACE9C55E319286C49E6B2F9CE87F3D7A341DD54DACA5AEAF7558DF0016B6B186A1545E5C0576FD5CD695BDAAB606A051B90388E84CBBBE900F9C5E2F1F736AF4CB4827B17020CB54FC2B38C7D3C771044EAD80E08E339F9A477748BEFAC3CB8D214D9882627C4F6CD3FE1DC31FB5130663A68F7"
        const groupID = "8473766"
        const rankID = 2
        
        await roblox.setCookie(robloxToken);
        
        let playerName 
        let playerID

        playerID = await roblox.getIdFromUsername(args.target);
        playerName = await roblox.getUsernameFromId(playerID)
      
        await roblox.setRank(groupID, playerID, rankID)
      }
            const embed = new Discord.RichEmbed()
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