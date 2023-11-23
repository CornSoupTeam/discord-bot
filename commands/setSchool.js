const { SlashCommandBuilder } = require("discord.js");
const { NEISKEY } = require("../config");
const { userController } = require("../modules/dbConnecter");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("학교지정")
    .setDescription(
      "정보를 받아올 학교를 지정합니다. 정확한 정보를 입력하셔야 정보를 불러올 수 있어요 :)"
    )
    .addStringOption((option) =>
      option
        .setName("학교명")
        .setDescription("정보를 알고싶은 학교의 이름을 입력해주세요.")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("학년")
        .setDescription("정보를 알고싶은 학년을 입력해주세요.")
        .setRequired(true)
    )
    .addNumberOption((option) =>
      option
        .setName("반")
        .setDescription("정보를 알고싶은 반을 입력해주세요.")
        .setRequired(true)
    ),
  async execute(interaction) {
    const response = await fetch(
      `https://open.neis.go.kr/hub/schoolInfo?SCHUL_NM=${interaction.options.getString(
        "학교명"
      )}&Type=json&pIndex=1&pSize=10&KEY=${NEISKEY}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    const user = new userController({
      userId: interaction.user.id,
      neisInfo: [
        {
          ATPT_OFCDC_SC_CODE:
            data["schoolInfo"][1]["row"][0]["ATPT_OFCDC_SC_CODE"],
          SD_SCHUL_CODE: data["schoolInfo"][1]["row"][0]["SD_SCHUL_CODE"],
          grade: interaction.options.getNumber("학년"),
          class: interaction.options.getNumber("반"),
        },
      ],
    });
    if (userController.findOne({ userId: interaction.user.id })) {
      await userController.deleteOne({ userId: interaction.user.id });
    }
    user.save();

    await interaction.reply(
      "정보가 정상적으로 등록 되었습니다! 이제 다른 명령어를 사용할 수 있습니다."
    );
  },
};
