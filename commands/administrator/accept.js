const Discord = require("discord.js")
const { Command } = require("discord.js-commando")
const roblox = require("noblox.js")

module.exports = class accept extends Command {
  constructor(client){
    super(client, {
      name: "accept",
      description: "Accept join request.",
      
      group: "administrator",
      memberName: "accept",
      
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
    if(message.member.roles.find(role => role.name == "Admin")){
      return true 
    } else {
      return "Sorry :persevere:! You must be an administrator to use this command!"
    }
  }
  
  async run(message, { username }){
    
    // Primary Variables
    const sentMessage = await message.reply(`Allow me to work my magic.. :sleeping:`)
    
    const robloxToken = "_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_04785FD615394839242755D35CBA5C81F5B9A50073A273896481702C793A9686CA42F84910BF6C888DAFAC9737EB03A730425B16F33B8422B7442F795FA8BF3A7706FFEED09B569AE035AAA98143CB89C6722DDD40819F9DC1D912BD0F468F335D59696A7F6E9600E692E63453971BEA8890E399F349EC3BE695AEA4E82F73A7763BDE6D592E923683291389F4A85DD4C08701B85E270BB55EF13E324BB5A0C962037537E2C03BE11DC6C5DBF64433C2B57415E3EFD4DD046FED9CE0DD395A016CC16DFCB9EDCE87C0DDA7499D92059EBB12A8BC455F2D5229B421DF5555015CC6D63C337A4BC0F70CAF264694B9512D4C4973FF042F7102D44EEF00A5FB9FD24562CD9ADAAAD44348D310C1AD0A3FDE39110543F6DE60797DC1BD3F8215322BD3222FA7"
    const groupID = "9179506"
    
    let playerType 
    let playerName 
    let playerID 
    
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
      } else if(playerType == "USERNAME"){
        playerID = await roblox.getIdFromUsername(username)
        playerName = await roblox.getUsernameFromId(playerID)
      }
    } catch(error){
      sentMessage.edit(`${message.author}, :construction: There has been an error! \`\`\`js\n${error}\`\`\``)
      return
    }
    
    try {
      await roblox.handleJoinRequest(groupID, playerID, true).then(() => {
        sentMessage.edit(`${message.author}, :raised_hands: Successfully accepted **${playerName}**!`)
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