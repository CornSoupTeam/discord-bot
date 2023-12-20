const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, token } = require("./config");

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

const commands = [];

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(
  "MTE3MTczNzk5Mzc5MTQxODM2OA.GEei6w.qtmh0MVAkMvskN7woxmbMPKd4cO83VhghzLvsI"
);

rest
  .put(Routes.applicationCommands("1171737993791418368"), { body: commands })
  .then(() => {
    console.log("✔️ | 명령어 등록 완료!");
    process.exit(0); // Exit the script after successful registration
  })
  .catch(console.error);
