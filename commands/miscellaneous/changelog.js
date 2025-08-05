const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
  constructor(client) {
    super(client, {
      name: "changelog",
      aliases: ["cl"],
      group: "miscellaneous",
      memberName: "changelog",
      description: "Posts a change log to the change log channel",
      ownerOnly: true,
      args: [
        {
          type: "string",
          prompt: "What is the Description?",
          key: "description"
        }
      ]
    });
  }
  async run(msgObject, { description }) {
    let channel = this.client.guilds
      .get("781717352965341236")
      .channels.find("id", "781717353594486800");
    channel.send("@everyone");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setTitle("Change Log")
      .setDescription(description)
      .setTimestamp();
    channel.send(Embed);
  }
};
