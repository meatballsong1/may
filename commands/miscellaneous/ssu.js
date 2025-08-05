const Discord = require("discord.js");
const { Command } = require("discord.js-commando");
const request = require("request-promise");
module.exports = class changelog extends Command {
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
          type: "string",
          prompt: "What are the notes for the ssu?",
          key: "notes"
        }
      ]
    });
  }
  hasPermission(msgObject) {
    const MainServer = msgObject.client.guilds.get("1395025885278765177");
    if (msgObject.guild.id == 1395025885278765177) {
      if (msgObject.member.roles.find(role => role.name === "Admin")) {
        return true;
      } else if (
        msgObject.author == this.client.users.get("753778820733206629")
      ) {
        return true;
      } else if (msgObject.member.roles.find(role => role.name == "Moderator")) {
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
  async run(msgObject, { notes }) {
    let channel = this.client.guilds
      .get("1395025885278765177")
      .channels.find("id", "782467706439467040");
    let Embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setAuthor(
        `${msgObject.member.displayName}`,
        `${msgObject.author.avatarURL}`
      )
      .setTitle(`Server Startup`)
      .setDescription(`${msgObject.author} is conducting a server startup!`)
      .addField(
        `:link: Link`,
        `[New Haven County](https://www.roblox.com/games/5998379341/MayflowerWARE)`
      )
      .addField(`:book: Notes`, `**__${notes}__**`)
      .setTimestamp();
    channel.send("@here", Embed);

    msgObject.reply(`Congrats 🙌! Your server startup has been announced!`);
  }
};