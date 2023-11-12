const { SlashCommandBuilder } = require("discord.js");
const { inviteController } = require("../modules/dbConnecter");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("초대정보")
    .setDescription(
      "내가 만든 초대 링크에 대한 정보 혹은 남이 만든 초대링크에 대한 정보를 확인합니다."
    )
    .addStringOption((option) =>
      option
        .setName("상세링크")
        .setDescription(
          "https://invite.sver.dev/**sverdev** 와 같이 강조 표시된 부분을 입력해주세요."
        )
    ),
  async execute(interaction) {
    await interaction.reply("아직 제작중인 기능입니다.");
  },
};
