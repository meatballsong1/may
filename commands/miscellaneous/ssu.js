const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");

module.exports = class SSUCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ssu",
      aliases: ["startup"],
      group: "miscellaneous",
      memberName: "ssu",
      description: "Posts a server startup to the #announcements channel",
      ownerOnly: true,
      throttling: {
        usages: 1,
        duration: 8000
      },
      args: [
        {
          key: "notes",
          prompt: "What are the notes for the ssu?",
          type: "string"
        }
      ]
    });
  }

  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.cache.get("1395025885278765177");
    if (msgObject.guild.id == "1395025885278765177") {
      const hasRole = roleName =>
        msgObject.member.roles.cache.some(role => role.name === roleName);
      if (hasRole("Admin") || hasRole("Moderator")) return true;
      if (msgObject.author.id === "1160424627521212417") return true;

      return "Sorry 😣! You must be a Moderator or Admin!";
    } else {
      return `Sorry 😣! You must use this command in the ${MainServer?.name || "Main Server"}!`;
    }
  }

  async run(msgObject, { notes }) {
    const channel = this.client.guilds.cache
      .get("1395025885278765177")
      .channels.cache.get("1398060322841170000");

    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setAuthor({
        name: msgObject.member.displayName,
        iconURL: msgObject.author.displayAvatarURL()
      })
      .setTitle("Server Startup")
      .setDescription(`${msgObject.author} is conducting a server startup!`)
      .addField(
        ":link: Link",
        `[New Haven County](https://www.roblox.com/games/97947775346425/New-Haven-County)`
      )
      .addField(":book: Notes", `**__${notes}__**`)
      .setTimestamp();

    channel.send({
      content: "@here",
      embeds: [embed]
    });

    msgObject.reply("Congrats 🙌! Your server startup has been announced!");
  }
};
