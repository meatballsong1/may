const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const Trello = require("trello");
const request = require("request-promise");
var trello = new Trello(
  "e752622bcd4de22bbc07b6838a6bba74",
  "48d0b091506d386846fada4d7c2c285c5beccb780e16f51a582c0e2b430329c9"
);

module.exports = class gban extends Command {
  constructor(client) {
    super(client, {
      name: "gban",
      aliases: ["gameban", "remoteban"],
      group: "mod",
      memberName: "gban",
      description: "Bans a user from the game",
      guildOnly: true,
      args: [
        {
          type: "string",
          label: "username",
          prompt: "What is the Roblox username?",
          key: "username"
        },
        {
          type: "string",
          prompt: "What is the reason for moderating this user?",
          key: "reason"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("781717352965341236");
    if (msgObject.guild.id == 781717352965341236) {
      if (msgObject.member.roles.find(role => role.name === "Moderator")) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      }
      return "Sorry 😣! You must be a Moderator or Admin!";
    } else {
      return (
        "Sorry :persevere:! You must use this command in the " +
        MainServer.name +
        "!"
      );
    }
  }
  async run(msgObject, { username, reason }) {
    const editMessage = await msgObject.reply(
      `Coolio!! Let's get on with this and ban \`${username}\``
    );
    let data = await request({
      uri: `https://api.roblox.com/users/get-by-username?username=${username}`,
      json: true,
      simple: false
    });
    if (data.errorMessage) {
      return editMessage.edit(
        "Sorry 😣! You haven't entered a valid Roblox username!"
      );
    } else {
      editMessage.edit(`Ooooh, we've got their UserID as \`${data.Id}\`!`);
      let authorData = await request({
        uri: `https://verify.eryn.io/api/user/${msgObject.author.id}`,
        json: true,
        simple: false
      });
      editMessage.edit(
        `Ooooh, we've also got your UserID as \`${authorData.robloxId}\`!`
      );
      editMessage.edit(
        `Congrats 🙌! Your command will be executed in-game shortly!`
      );
      editMessage.edit(`Congrats 🙌! Your command has been executed in-game!`);
      trello.addCard(`${username}:${data.Id}`, "", "600541ffd23d800440a03934");
    }
  }
};
