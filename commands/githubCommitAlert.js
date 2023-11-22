const { SlashCommandBuilder } = require("discord.js");
const { githubController } = require("../modules/dbConnecter");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("1일1커밋알림")
    .setDescription("1일 1커밋을 위해 알림을 전달 해드립니다 🔥")
    .addStringOption((option) =>
      option
        .setName("닉네임")
        .setDescription("매일 1 커밋 알림을 받을 아이디를 지정합니다.")
        .setRequired(true)
    ),
  async execute(interaction) {
    function escapeString(inputString) {
      return inputString.replace(/[.*+?^${}()|\[\]\\]/g, "\\$&");
    } // 인젝션 방지용

    const git = new githubController({
      userId: interaction.user.id,
      githubId: escapeString(interaction.options.getString("닉네임")),
      guildId: interaction.guild.id,
      channelId: interaction.channel.id,
    });
    if (githubController.findOne({ userId: interaction.user.id })) {
      await githubController.deleteOne({ userId: interaction.user.id });
    }
    git.save();

    await interaction.reply(
      interaction.options.getString("닉네임") +
        " (으)로 설정 되었습니다. 이제 매일 오후 10시, 1일 1커밋이 되어 있지 않는 경우 해당 채널에 태그와 함께 메시지가 전송됩니다."
    );
  },
};
