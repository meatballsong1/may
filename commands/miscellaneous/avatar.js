const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class avatar extends Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      aliases: ["av"],
      group: "miscellaneous",
      memberName: "avatar",
      description: "Gets a user's avatar",
      args: [
        {
          type: "user",
          prompt: "What is the User?",
          key: "argUser"
        }
      ]
    });
  }
  async run(msgObject, { argUser }) {
    let Embed = new Discord.MessageEmbed()
      .setAuthor(argUser.tag, argUser.avatarURL)
      .setColor("RANDOM")
      .setTitle("Avatar")
      .setImage(argUser.avatarURL)
      .setTimestamp();
    msgObject.channel.send(Embed);
  }
};
