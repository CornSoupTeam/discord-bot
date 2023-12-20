const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { executeQuery } = require("../modules/postdbConnecter");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("포인트확인")
    .setDescription("보유중인 포인트를 확인합니다."),
  async execute(interaction) {
    userinfo = executeQuery(
      `SELECT * FROM member WHERE id = ${interaction.user.id}`
    );
    serverinfo = executeQuery(
      `SELECT * FROM server WHERE id = ${interaction.guild.id}`
    );

    if (userinfo == null) {
      const query = {
        text: "INSERT INTO member(id, point, createdat, level, state, exp) VALUES($1, $2, $3, $4. $5, $6)",
        values: [interaction.user.id, 1, new Date(), 1, True, 1],
      };
      userinfo = await executeQuery(query);
    }

    if (serverinfo == null) {
      const query = {
        text: "INSERT INTO server(id, currencyUnit) VALUES($1, $2)",
        values: [interaction.guild.id, "원"],
      };
      userinfo = await executeQuery(query);
    }

    const textEmbed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle(
        `<@${userinfo["id"]}>님은 ${userinfo["point"]}${serverinfo["currencyUnit"]} 만큼 보유중입니다.`
      )
      .setDescription("순위를 보시려면 /순위 명령어를 사용해주세요.");
    await interaction.reply({ embeds: [textEmbed] });
  },
};
