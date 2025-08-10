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
        
        await roblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_CAEaAhAB.8721E6F33024FBC73FF4E369211B03F63E174C2579D1AF92D2392C2034A97E38F2F019F6E4BA0F76BFE123BE30EAF249701C65F2F3D439780CC9336E71C3AB1D243FC387EE34989CE641E4FAC224DC20759CFDDD9F2CAAC5BB33563807286B932B3F13C00947906E53B6A41EB3B17705CE09D9E1988911AB8D727F4B8AC14FF78D662109559FD0D7F01264CAE1966A911CB7A2D652EF80025B7788972ED6DB109496A0E17858B35881830522D7FEDB99201BC55DBF30EABD65A830E420CF66A79202A0FA009CDCD6ECE86168461EF862CCEC3F8199370F58C8167511425A034D057FC5BDEF0B105D2A0F5F07D7095D1D6019C0392228C0513F4245211DD27BA0F89820C1752A32DF8D62B9421C3D810D898FE86D55819C2BE6CDCBFE06205E0CD17DE5446478565404356EC32EA507B33AD7BB967FD00A56E227FA50859C0C38A0B89E3CC6AA2FBC6E79B7ADE6EA220D70F9107FDA4C1DC9BB942BE97B871C89BF258EBA0660F0445455A2AECF17EEFA6852BEC3D8B2C3FC3D6F40E59933EBBF4A9C3DDE683F11325B109C0749E1536651F708A9659BDF00D20D9032ACD774ECCC96162B2D904883196A1A47155563A7C94D6C33BF8E7211BBBAB508C856890D43FE2932F8D36BD5E214B1B67C3989ED56E18411819D6C8359C3660CCFC597EADB4CEF47D1ECBAF142E87E9E9934925CF37B661F3BE6F033458330536B8F4D1DA5A06EA0FB2F0502A0DED91171205960704DD8060905EBB5AD61E1019AB40FC16215A1CAABB4D2A24CD141B5835A6D7982670C6A522114ACD09E8338A38E247BACC7602110F9A2AF43110277C7008CA7ABDB9842DE7DE491B9E32A1089A91846C9A9FA0D5C3422DD7B67961286D13F0CE1308E1B302001201D3DAC7BAAD83C3E86807F885298C2EA5BA32A14A00A646338F973303FB83DB4FCDF2B8A052F007F37E3CD9A876E2719F74F592830A77847651ED3DD0B431A44C86989EA7001E4B074D4332D5BB0162193706FD02AB49396EF504DCF90B6B2B4EFD20E3D1CBCEF3F7B07EBE156AB199A8C799BC467A5A9992C239BC937358E9B3181431EF391A9EBDE5CA8510477E8A47D6818A1A9A5A3C7B4916E94CF8856D0394DB657DDC8F93DAE59844E750BA136BA1516D2AF74FA519BD9D1371DBDC769FBE1F69D0303FA8AE565AE70633CD973E3BB1F0DB2C26DE9ACAAB449A9B8913310CD645150809F02BDA261C6');
        
        let playerName 
        let playerID

        playerID = await roblox.getIdFromUsername(args.target);
        playerName = await roblox.getUsernameFromId(playerID)
      
        await roblox.setRank(groupID, playerID, rankID)
      }
            const embed = new Discord.MessageEmbed()
                .setTimestamp()
                .setTitle(`${args.username}'s Citizenship Appeal`)
                .setDescription(choice)
            webhook.send('', {
                username: 'Citizenship',
                content: `cc: ${args.target}`
                embeds: [embed]
            })
            message.reply('Successfully sent your appeal message! 🤗')
    }
}