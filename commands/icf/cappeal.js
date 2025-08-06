const Discord = require('discord.js')
const {
    Command
} = require('discord.js-commando')

const roblox = require("noblox.js")
require('dotenv').config()
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
        
        await roblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_CAEaAhAB.F0D149DBFCC5805954DFE21A684C15BB472E18666A9744912D38ED6E4B656BDCC882F3EB259334BF0091E584E2DAF28364F392F0B12256DE2417E4C75FE9660B82FC14471EC311878FBBCB84AA6BD5E3D67767841F38E68997F8BE6BBEE4D8A8FA27AF04EE7490AF331FF4E3BD51CA1751F484FC5B4B42E004C5B8DA314A503A706823CCEDD2C4B7DAE90F7E188392799F032B035335AC0318331FE2D76A028A159C2917718B9AC1C3E9493D25A85A326E854E9263F4D5858C23D0A9FFED0BAF41BAC9A4F16990A29A5376B978576CC1B247E7B60250AF749209EE2F128D766A788740A8179407607F1138BBD33645885D543E3335D58B3221B248C6B42B59CAD99D60D710A466935BAE899E7606DA7D4D43B01FD365A522EC642F38B5A836F1C763B0D4EA5C903EB897D8B393C658284D3B03D7B602D5EDDB320372A07EC8A4D9FFAA3602C4F280F66C88B8864A10AAA68FDECC69CC1FB8D29D48E22B286EC39F138E8B6E5013DA1DDE382EDD3280221B9A46DFF67A937978054F260ACE004D7A36538EBA1B2178B46F6F53D6842180BEEC4146D0D8E2E0AB054ED61FAC5E039A1954D34B601D7ED48F7B721D0A3F475655931276C5946E33AE18CE35A52D1B1E7F1AFCCC31F3A15D5575237D518E819B7F3CB6C4AADDC742BB68CDBA94023BAE05E3B8E2699982E7AFAC186C4A9BA495FCEE02C63AAEEDA75D9C8338300E40E9C4F68B8F67135B428969DF74ADB55ED9AAEDD7FB6FAA6FD23E617854C755B23893CF8B06F027DB736AF1AA201674CFF7E5B98A3CCD385F51D258BE1665F7D922DE431AE4B128F7644CD45F00F932223C8F243A00912192E6A560CFE482157F4B2876869DEBEDEE9D177D31E18986C33E33A62018F0E7A5181D2A641A49908D77C1BB5F6BDC1E60CA49AFEBCD6D9E541DE6C87475F05D5C5ED19D7BE6973100BCC0B87E9C56D38EA3AC95BB7983986E1EDB8F59666BA846523A1B63B850C3550C70EFCBB481847B3C6B85DCEE0549704CE9E464485A03EDCF2C24FDFD796B1400F185C72CD58D66B93F68BDC4936359DF93C8B164BCBCB5FF21C6300E32C9D69821AC51E7D37C0456BBB83B262B10C44E4237A59F72A8C8A3D2DFDF52A32072F49349DB637A7A123F2E74250203B2BF855417B5329B324EAC416E89B1B60E47E810F2CE1F33A7947F06523129B88350295F286E86F6652D1EF3D91A72E9277FB5D402C3');
        
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