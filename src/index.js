const {
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

// ------------------------------------------------------------------
const { version } = require("../package.json");
const { guildId, specialVoiceChannelId } = require("../config.json");
// ------------------------------------------------------------------

// ----------------- npm discord-together ---------------
const { DiscordTogether } = require("discord-together");
const dt = new DiscordTogether(client);
// ------------------------------------------------------

client.once("ready", () => {
  const { user } = client;
  console.log(`Ready!\nLogged in as ${user.username} (v${version})`);
  user.setPresence({
    status: "online",
    activities: [
      {
        name: `v${version}`,
      },
    ],
  });
});

client.on("messageCreate", async (message) => {
  if (!client.application?.owner) await client.application?.fetch();

  const data = [
    {
      name: "start",
      description: "Create a play together",
    },
    {
      name: "ping",
      description: "pong pong pong",
    },
  ];

  if (
    message.content.toLowerCase() === "!deploy global" &&
    message.author.id === client.application?.owner.id
  ) {
    const command = await client.application?.commands.create(data);
    console.log(command);
  } else if (
    message.content.toLowerCase() === "!deploy guild" &&
    message.author.id === client.application?.owner.id
  ) {
    const command = await client.guilds.cache
      .get(guildId)
      ?.commands.create(data);
    console.log(command);
  } else if (
    message.content.toLowerCase() === "!deploy set" &&
    message.author.id === client.application?.owner.id
  ) {
    const commands = await client.application?.commands.set(data);
    console.log(commands);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (interaction.commandName === "start") {
    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("play-together")
        .setPlaceholder("Select an option")
        .addOptions([
          {
            label: "Youtube",
            description: "Watch Youtube Together",
            value: "youtube",
            emoji: "🎬", // 📺
          },
          {
            label: "Poker",
            description: "Play Poker Together",
            value: "poker",
            emoji: "🃏", // 🎲
          },
          {
            label: "Chess",
            description: "Play Chess Together",
            value: "chess",
            emoji: "♟",
          },
          {
            label: "Betrayal",
            description: "Play Betrayal Together",
            value: "betrayal",
            emoji: "🤼",
          },
          {
            label: "Fishing",
            description: "Play Fishing Together",
            value: "fishing",
            emoji: "🎣",
          },
        ])
    );
    await interaction.reply({
      content: "<:catsuHeya:855395050552164363>",
      components: [row],
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isSelectMenu()) return;
  // console.log(interaction);

  if (interaction.customId === "play-together") {
    const value = interaction.values[0];
    switch (value) {
      case "youtube": {
        dt.createTogetherCode(specialVoiceChannelId, value).then(
          async (invite) => {
            const embed = new MessageEmbed()
              .setColor("#407294")
              .setTitle("Watch YouTube Together")
              .setDescription(`[Click to join](<${invite.code}>)`);

            await interaction.update({
              content: "<:catsuChillin:855395049902964737>",
              embeds: [embed],
              components: [],
            });
          }
        );
        break;
      }

      case "poker": {
        dt.createTogetherCode(specialVoiceChannelId, value).then(
          async (invite) => {
            const embed = new MessageEmbed()
              .setColor("#407294")
              .setTitle("Play Poker Together")
              .setDescription(`[Click to join](<${invite.code}>)`);

            await interaction.update({
              content: "<:catsuFlex:855395050137976833>",
              embeds: [embed],
              components: [],
            });
          }
        );
        break;
      }

      case "chess": {
        dt.createTogetherCode(specialVoiceChannelId, value).then(
          async (invite) => {
            const embed = new MessageEmbed()
              .setColor("#407294")
              .setTitle("Play Chess Together")
              .setDescription(`[Click to join](<${invite.code}>)`);

            await interaction.update({
              content: "<:catsuThinking:855395051148804126>",
              embeds: [embed],
              components: [],
            });
          }
        );
        break;
      }

      case "betrayal": {
        dt.createTogetherCode(specialVoiceChannelId, value).then(
          async (invite) => {
            const embed = new MessageEmbed()
              .setColor("#407294")
              .setTitle("Play Betrayal Together")
              .setDescription(`[Click to join](<${invite.code}>)`);

            await interaction.update({
              content: "<:catsuSoyouregonnadie:855395051018125323>",
              embeds: [embed],
              components: [],
            });
          }
        );
        break;
      }

      case "fishing": {
        dt.createTogetherCode(specialVoiceChannelId, value).then(
          async (invite) => {
            const embed = new MessageEmbed()
              .setColor("#407294")
              .setTitle("Play Fishing Together")
              .setDescription(`[Click to join](<${invite.code}>)`);

            await interaction.update({
              content: "<:catsuShiver:855395051118264320>",
              embeds: [embed],
              components: [],
            });
          }
        );
        break;
      }
    }
  }
});

// ---------- LOGIN ----------
require("dotenv").config();
client.login(process.env.TOKEN);
