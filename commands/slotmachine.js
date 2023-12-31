const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { addpoint } = require("../modules/userdb");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("블랙잭")
    .setDescription("블랙잭 게임을 해요.")
    .addIntegerOption((option) =>
      option
        .setName("포인트")
        .setDescription("걸 포인트를 지정해요.")
        .setMinValue(1)
        .setRequired(true)
    ),

  async execute(interaction) {
    const emojis = ["🍇", "🍊", "🍋", "🍉", "🍌", "🍓", "🍍", "🍒", "🔔", "🎰"];

    const result = Array.from(
      { length: 3 },
      () => emojis[Math.floor(Math.random() * emojis.length)]
    );

    if (result.every((emoji) => emoji === "🎰")) {
      point = interaction.options.getInteger("포인트") * 3;

      const response = `🎉 대박! 모두 일치! ${point}를 얻었어요`;
    } else if (result[0] === result[1] && result[1] === result[2]) {
      point = interaction.options.getInteger("포인트") * 2;

      response = `🎊 중간 당첨! 일치하는 이모지 3개! ${point}를 얻었어요`;
    } else if (
      result[0] === result[1] ||
      result[1] === result[2] ||
      result[0] === result[2]
    ) {
      point = 0;
      response = "🎈 소소한 당첨! 일치하는 이모지 2개! 하지만 보상은 없어요 :(";
    } else {
      point = interaction.options.getInteger("포인트") * -1.9;
      response = `💔 아쉬워요. 아무것도 일치하지 않았습니다. ${point} 포인트를 잃었어요.`;
    }

    textEmbed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(`🎰 슬롯머신 🎰`)
      .setDescription(`**슬롯머신 결과:**  ${result.join(" ")}`)
      .addFields({ name: "보상", value: response });
    if (!point == 0) {
      await addpoint(interaction, point);
    }
    await interaction.reply({ embeds: [textEmbed] });
  },
};
