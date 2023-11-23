const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require("./config");
const fs = require("fs");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once("ready", () => {
  console.log("시스템 | 정상적으로 로그인 되었습니다.");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "명령어를 실행하는 도중 오류가 발생했습니다.",
      ephemeral: true,
    });
  }
});

client.login(token);
