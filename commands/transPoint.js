const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { transpoint } = require("../modules/userdb");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("이체")
    .setDescription("보유중인 포인트를 이체합니다.")
    .addUserOption((option) =>
      option
        .setName("대상")
        .setDescription("해당 멤버에게 포인트를 전송합니다")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("포인트")
        .setDescription("전송할 포인트를 입력합니다.")
        .setMinValue(1)
        .setRequired(true)
    ),
  async execute(interaction) {
    op = await transpoint(interaction);
    if (op == true) {
      textEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(`✔️ 포인트가 이체  되었습니다.`)
        .setDescription(
          `<@${interaction.user.id}>님의 포인트가 <@${
            interaction.options.getUser("대상").id
          }>님께 이체 되었습니다.`
        );
    } else if (op == false) {
      textEmbed = new EmbedBuilder()
        .setColor("#0099ff")
        .setTitle(`❌ 포인트가 부족합니다.`)
        .setDescription(
          `포인트가 부족합니다. 활동을 통해 포인트를 모아보세요!`
        );
    }
    await interaction.reply({ embeds: [textEmbed] });
  },
};
