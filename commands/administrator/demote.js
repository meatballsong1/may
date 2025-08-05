const Discord = require("discord.js")
const { Command } = require("discord.js-commando")
const roblox = require("noblox.js")

module.exports = class demote extends Command {
  constructor(client){
    super(client, {
      name: "demote",
      description: "Demote in group.",
      
      group: "administrator",
      memberName: "demote",
      
      args: [
        {
          type: "string",
          prompt: "What is their Roblox username?",
          key: "username",
        }
      ]
    })
  }
  
  hasPermission(message){
    if(message.member.roles.cache.find(role => role.name == "Admin")){
      return true 
    } else {
      return "Sorry :persevere:! You must be an administrator to use this command!"
    }
  }
  
  async run(message, { username }){
    
    // Primary Variables
    const sentMessage = await message.reply(`Allow me to work my magic.. :sleeping:`)
    
    const robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_9CC6A1337179AD232C6C7372363B4760BB388732C2C6FE84FBDD0AC6B19D6CFFF82707C3476EC9869806BBD358276EB2F006044D5A7BFC913198E52576A9B9671595A74E10263E9BAF306B59812B74F0DD073404E592701C6A4928DA576378AE47681803E5073B8B5BA27E3ED94EA8A0DC1DD5ED0F63786777E5CB152D618231E153535559D04DE9828F48B9D96DDA1F419BC31BF5457EA05A4FE7673D51993DA8CA1E237E1D8D0791203879D2C07DED4E9FB974A5E747690BF4059FA4AA1F49971B82C944BCFD618D27B215457F8BD69BC8698BBFAC549FFE57BCFD6F89D7E0020B74847084494AAB81F2F4323E5758D8B0B31060FAAB4B3F0E2D6833612B40B8697302C356BA57965221FB182ECDE6CF185AD7A7D93552A781ADEB7C98DDEA011195D2"
    const groupID = "8473766"
    
    let playerType 
    let playerName 
    let playerID 
    
    let playerOldRank
    let playerNewRank 
    
    if(Number(username)){
      playerType = "ID"
    } else {
      playerType = "USERNAME"
    }
    
    
    // Primary Functions 
    await roblox.setCookie(robloxToken)
    
    try { 
      if(playerType == "ID"){
        playerName = await roblox.getUsernameFromId(username)
        playerID = await roblox.getIdFromUsername(playerName)
        playerOldRank = await roblox.getRankNameInGroup(groupID, playerID)
      } else if(playerType == "USERNAME"){
        playerID = await roblox.getIdFromUsername(username)
        playerName = await roblox.getUsernameFromId(playerID)
        playerOldRank = await roblox.getRankNameInGroup(groupID, playerID)
      }
    } catch(error){
      sentMessage.edit(`${message.author}, :construction: There has been an error! \`\`\`js\n${error}\`\`\``)
      return
    }
    
    try {
      await roblox.demote(groupID, playerID).then(() => {
        async function getData(){
          playerNewRank = await roblox.getRankNameInGroup(groupID, playerID)
        }
        
        getData().then(
          sentMessage.edit(`${message.author}, :raised_hands: Successfully demoted **${playerName}** from **${playerOldRank}** to ${playerNewRank}**!`)
        )
      }).catch(error => {
        sentMessage.edit(`${message.author}, :construction: There has been an error! \`\`\`js\n${error}\`\`\``)
        return
      })
    } catch(error){
      sentMessage.edit(`${message.author}, :construction: There has been an error! \`\`\`js\n${error}\`\`\``)
      return
    }
    
    
  }
}