const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("순위")
    .setDescription("서버에서 가장 많은 포인트를 보유중인 멤버를 확인합니다."),

  async execute(interaction) {
    await interaction.reply({ embeds: [textEmbed] });
  },
};
