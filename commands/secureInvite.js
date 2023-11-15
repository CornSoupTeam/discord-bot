const { SlashCommandBuilder } = require("discord.js");
const { inviteController } = require("../modules/dbConnecter");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("보안초대")
    .setDescription(
      "강력한 보안을 이용하여 여러가지 옵션으로 유저를 초대 해보세요."
    )
    .addStringOption((option) =>
      option
        .setName("인증타입")
        .setDescription("인증에 사용할 방법을 선택해주세요.")
        .setRequired(true)
        .addChoices(
          { name: "캡챠", value: "클라우드플레어의 캡챠만을 사용합니다." },
          {
            name: "소셜 로그인 + 캡챠",
            value: "소셜 로그인과 캡챠를 사용합니다.",
          },
          {
            name: "소셜 로그인(카카오 실명으로 제한) + 캡챠",
            value: "실명을 사용한 로그인만을 사용합니다.",
          }
        )
    )
    .addNumberOption((option) =>
      option
        .setName("초대제한")
        .setDescription(
          "해당 초대 링크로 초대를 받을 수 있는 횟수를 설정해주세요."
        )
    )
    .addNumberOption((option) =>
      option
        .setName("만료시간")
        .setDescription(
          "만료 시간을 설정해주세요. 만료 시간이 지나면 해당 초대 링크는 사용할 수 없습니다."
        )
    )
    .addRoleOption((option) =>
      option
        .setName("역할")
        .setDescription("초대시 부여할 역할을 선택해주세요.")
    )
    .addStringOption((option) =>
      option
        .setName("통신사차단")
        .setDescription(
          "선택하신 통신사의 유저는 해당 초대 링크를 사용할 수 없도록 제한합니다."
        )
    ),
  async execute(interaction) {
    await interaction.reply("아직 제작중인 기능입니다.");
  },
};
