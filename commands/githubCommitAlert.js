const { SlashCommandBuilder } = require("discord.js");
const { githubController } = require("../modules/dbConnecter");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("1일1커밋알림")
    .setDescription("1일 1커밋을 위해 알림을 전달 해드립니다 🔥")
    .addStringOption((option) =>
      option
        .setName("GITHUB 닉네임")
        .setDescription("매일 1 커밋 알림을 받을 아이디를 지정합니다.")
        .setRequired(true)
    )
    .addChannelOption((option) =>
      option
        .setName("알림 받을 채널")
        .setDescription("커밋 리마인더 알림을 받을 채널을 지정합니다.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const git = new githubController({
      userId: interaction.user.id,
      githubId: interaction.options.getString("GITHUB 닉네임"),
    });
    if (githubController.findOne({ userId: interaction.user.id })) {
      await githubController.deleteOne({ userId: interaction.user.id });
    }
    git.save();

    await interaction.reply(
      interaction.options.getString("GITHUB 닉네임") +
        " 으로 설정 되었습니다. 이제 매일 오후 10시, 1일 1커밋이 되어 있지 않는 경우 태그와 함께 메시지가 전송됩니다."
    );
  },
};
