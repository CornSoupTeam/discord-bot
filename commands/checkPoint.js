const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { finduser } = require("../modules/userdb");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("포인트확인")
    .setDescription("보유중인 포인트를 확인합니다.")
    .addUserOption((option) =>
      option
        .setName("대상")
        .setDescription("해당 멤버의 포인트를 확인합니다 (선택).")
    ),
  async execute(interaction) {
    if (interaction.options.getUser("대상")) {
      info = await finduser(interaction, "other");
      username = interaction.options.getUser("대상").username;
    } else {
      info = await finduser(interaction, "user");
      username = interaction.user.username;
    }
    const textEmbed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(
        `${username}님은 ${info[0][0]["point"]}${info[1][0]["currencyunit"]}만큼 보유중입니다.`
      )
      .setDescription("순위를 보시려면 ```/순위``` 명령어를 사용해주세요.");
    await interaction.reply({ embeds: [textEmbed] });
  },
};
