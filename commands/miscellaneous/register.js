const { Command } = require("discord.js-commando");

module.exports = class RegisterCommand extends Command {
  constructor(client) {
    super(client, {
      name: "register",
      aliases: ["reg"],
      group: "miscellaneous",
      memberName: "register",
      description: "Register in an election",
      guildOnly: true,
      args: [
        {
          key: "Type",
          prompt: "Which election do you wish to register in? Current available elections: `SENATE` / `SHERIFF`",
          type: "string",
          validate: text => {
            if (text.toUpperCase() === "SENATE" || text.toUpperCase() === "SHERIFF") return true;
            return "Please enter either `SENATE` or `SHERIFF`.";
          }
        }
      ]
    });
  }

  async run(msgObject, { Type }) {
    const election = Type.toUpperCase();
    const senatorRoleId = "1404104681554186301";
    const sheriffRoleId = "1404104558635909232";

    let roleId, oathText;

    if (election === "SENATE") {
      roleId = senatorRoleId;
      oathText = `I, ${msgObject.author.username}, affirm and acknowledge that the message I am sending is my official request, though not obligation; of a registration to the Senate election. I affirm and acknowledge that I have met the requirements specified inside of ⁠elections.`;
    } else if (election === "SHERIFF") {
      roleId = sheriffRoleId;
      oathText = `I, ${msgObject.author.username}  affirm and acknowledge that the message I am sending is my official request, thought not obligation; of a registration to the sheriff election. I affirm and acknowledge that I have met the requirements specified inside of ⁠elections.`;
    }

    const member = msgObject.member;

    // Check if they already have the role
    if (member.roles.cache.has(roleId)) {
      return msgObject.reply(`You already registered in the ${election} election.`);
    }

    // Ask them to reply with the oath
    await msgObject.reply(`Please reply to this message with the following oath exactly:\n\n\`\`\`\n${oathText}\n\`\`\``);

    // Set up message collector
    const filter = m => m.author.id === msgObject.author.id;
    const collector = msgObject.channel.createMessageCollector({ filter, time: 60000 }); // 60s to respond

    collector.on("collect", async m => {
      if (m.content.trim() === oathText) {
        await member.roles.add(roleId);
        await m.reply(`Thank you for registering in the ${election} election! You have been awarded the <@&${roleId}> role.`);
        collector.stop();
      } else {
        await m.reply("Your message does not match the oath exactly. Please try again.");
      }
    });

    collector.on("end", (collected, reason) => {
      if (reason === "time") {
        msgObject.reply("You did not reply in time. Please run the command again.");
      }
    });
  }
};
