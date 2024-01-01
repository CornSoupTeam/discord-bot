const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { pointRanking } = require("../modules/userdb");

module.exports = {
  data: new SlashCommandBuilder().setName("순위").setDescription("순위"),

  async execute(interaction) {
    const userData = await pointRanking(interaction);
    const embed = new EmbedBuilder()
      .setTitle("순위")
      .setColor("#0099ff")
      .setDescription("서버에서의 유저별 TOP 10 순위입니다.");
    userData.forEach((user, index) => {
      embed.addFields({
        name: `${index + 1}위`,
        value: `<@${user.id.toString()}> \n > ${user.point.toString()}원`,
      });
    });
    await interaction.reply({ embeds: [embed] });
  },
};
