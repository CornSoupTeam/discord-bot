const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { userController } = require("../modules/dbConnecter");

function getToday() {
  var date = new Date();
  var year = date.getFullYear();
  var month = ("0" + (1 + date.getMonth())).slice(-2);
  var day = ("0" + date.getDate()).slice(-2);

  return year + month + day;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("오늘의급식")
    .setDescription("설정해둔 학교의 오늘의 급식을 알려줍니다."),
  async execute(interaction) {
    const user = await userController.findOne({
      userId: interaction.user.id,
    });
    if (user != null) {
      const response = await fetch(
        `https://open.neis.go.kr/hub/mealServiceDietInfo?Type=json&ATPT_OFCDC_SC_CODE=${
          user["neisInfo"][0]["ATPT_OFCDC_SC_CODE"]
        }&SD_SCHUL_CODE=${
          user["neisInfo"][0]["SD_SCHUL_CODE"]
        }&MLSV_YMD=${getToday()}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const meals = data?.mealServiceDietInfo?.[1]?.row;

      if (meals) {
        const mealFields = meals.map((meal) => ({
          name: meal["MMEAL_SC_NM"],
          value: `${meal["DDISH_NM"]
            .replace(/<br\/>/g, "")
            .replace(/(\([0-9.]+\))/g, "")}`,
        }));
        const textEmbed = new EmbedBuilder()
          .setColor("#0099ff")
          .setTitle(
            `${data["mealServiceDietInfo"][1]["row"][0]["SCHUL_NM"]}의 오늘의 급식입니다.`
          )
          .addFields(mealFields);
        interaction.reply({ embeds: [textEmbed] });
      } else {
        await interaction.reply(
          "급식 정보가 없습니다. 급식이 없는 날이거나, 급식 정보가 등록되지 않았습니다."
        );
      }
    } else {
      await interaction.reply(
        "학교 정보가 등록되지 않았습니다. /학교지정 명령어를 사용해주세요."
      );
    }
  },
};
