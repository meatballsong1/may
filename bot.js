const http = require("http");
const express = require("express");
const app = express();
var server = require("http").createServer(app);
require('dotenv').config()
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
const listener = server.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
//
//setInterval(() => {
 // http.get(`https://glitch.com/~mayflowers-lolz`);
//}, 4800000);

const Discord = require("discord.js");
const commando = require("discord.js-commando");
const request = require("request-promise");
const path = require("path");
const config = require(path.join(__dirname, "config", "config.json"));
const client = new commando.CommandoClient({
  owner: "1160424627521212417",
  commandPrefix: ";",
  unknownCommandResponse: false,
  selfbot: false,
  commandEditableDuration: 60
});

client.once("ready", () => {
  client.user.setPresence({
    game: { name: "with oofbomb :D" },
    status: "dnd"
  });
});

client.registry
  .registerGroups([
    ["mod", "Moderation commands"],
    ["miscellaneous", "Miscellaneous commands"],
    ["administrator", "Administrator commands"],
    ["es", "ES commands"],
    ["icf", "ICF commands"]
  ])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, "commands"));
let timeout = new Set();
let cdseconds = 15; // 1 Minute
client.on("message", async msgObject => {
  if (msgObject.channel.id == "1399456610157461574") {
    let Arguments = msgObject.content.split(" ");
    let guild = msgObject.client.guilds.cache.get("1399456610157461574");

    if (!guild) return;

    let channel = guild.channels.cache.find(c => c.id === Arguments[0]);
    if (channel) {
      try {
        const messages = await channel.messages.fetch({ around: Arguments[1], limit: 1 });
        const fetchedMsg = messages.first();
        if (fetchedMsg) {
          fetchedMsg.edit(
            `Wowzers, your command has been executed in-game on server \`${Arguments[2]}\`!`
          );
        }
      } catch (err) {
        console.error("Error fetching or editing message:", err);
      }
    }
  } else if (msgObject.channel.id == "1399456610157461574") {
    let Arguments = msgObject.content.split(" ");
    let guild = msgObject.client.guilds.cache.get("1399456610157461574");

    if (!guild) return;

    let channel = guild.channels.cache.find(c => c.id === Arguments[0]);
    let idMessage = Arguments[1];
    let JobId = Arguments[2];
    let pppeh = Arguments[3];
    let Players = Arguments[4];

    if (channel) {
      try {
        const messages = await channel.messages.fetch({ around: idMessage, limit: 1 });
        const fetchedMsg = messages.first();

        if (fetchedMsg) {
          const embed = new Discord.MessageEmbed()
            .setTitle(`Server ${pppeh}`)
            .setTimestamp()
            .setURL(`https://www.roblox.com/games/97947775346425/New-Haven-County?jobId=${JobId}`);

          Players = Players.split("|");
          Players.forEach(m => {
            let parts = m.split(":");
            embed.addField(
              parts[0],
              `[Roblox Profile](https://www.roblox.com/users/${parts[1]}/profile)`,
              true
            );
          });

          fetchedMsg.reply({ embeds: [embed] });
        }
      } catch (err) {
        console.error("Error fetching or replying with embed:", err);
      }
    }
  }

  if (msgObject.content.toLowerCase().includes("black")) {
    msgObject.channel.send("Did I just hear my favorite object?");
  }
});


client.login(process.env.TOKEN);
