const Discord = require("discord.js");
const { Command } = require("discord.js-commando");

module.exports = class great extends Command {
  constructor(client) {
    super(client, {
      name: "great",
      group: "miscellaneous",
      memberName: "great",
      description: "Find a random #great-logs message",
      guildOnly: true
    });
  }

  async run(msgObject) {
    const mainserver = msgObject.client.guilds.cache.get("1395025885278765177");
    const channel = mainserver.channels.cache.get("1400143051694801066");

    if (!channel || channel.type !== "text") {
      return msgObject.reply("Couldn't find the #great-logs channel.");
    }

    try {
      const messages = await channel.messages.fetch({ limit: 100 }); // adjust limit if needed
      const randomMsg = messages.random();

      if (!randomMsg) {
        return msgObject.reply("No messages found in #great-logs.");
      }

      const date = new Date(randomMsg.createdTimestamp).toDateString();

      msgObject.reply(
        `<#1400143051694801066> - ${date}:\n${randomMsg.content}`
      );
    } catch (err) {
      console.error(err);
      msgObject.reply("There was an error fetching messages.");
    }
  }
};
