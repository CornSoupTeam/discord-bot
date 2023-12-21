const { executeQuery } = require("../modules/postdbConnecter");

async function finduser(interaction, type) {
  if (type == "user") {
    targetuser = interaction.user.id;
  } else {
    targetuser = interaction.options.getUser("대상").id;
  }
  console.log();
  userinfo = await executeQuery(
    `SELECT * FROM member WHERE id = ${targetuser} AND serverid = ${interaction.guild.id}`
  );
  serverinfo = await executeQuery(
    `SELECT * FROM server WHERE id = ${interaction.guild.id}`
  );
  if (userinfo.length == []) {
    const query = {
      text: "INSERT INTO member(id, point, createdat, level, state, exp, serverid) VALUES($1, $2, $3, $4, $5, $6, $7)",
      values: [targetuser, 1, new Date(), 1, true, 1, interaction.guild.id],
    };
    await executeQuery(query);
    userinfo = [
      {
        point: 1,
      },
    ];
  }

  if (serverinfo.length == []) {
    const query = {
      text: "INSERT INTO server(id, currencyunit) VALUES($1, $2)",
      values: [interaction.guild.id, "원"],
    };
    await executeQuery(query);
    serverinfo = [
      {
        currencyunit: "원",
      },
    ];
  }
  return [userinfo, serverinfo];
}

async function transpoint(interaction) {
  point = interaction.options.getInteger("포인트");
  try {
    origininfo = await finduser(interaction, "user");
    targetinfo = await finduser(interaction, "other");
  } catch (e) {
    console.error(e);
  }
  if (origininfo[0][0]["point"] < point) {
    return false;
  } else {
    const originquery = {
      text: "UPDATE member SET point = $1 WHERE id = $2 AND serverid = $3",
      values: [
        origininfo[0][0]["point"] - interaction.options.getInteger("포인트"),
        interaction.user.id,
        interaction.guild.id,
      ],
    };
    await executeQuery(originquery);
    const afterquery = {
      text: "UPDATE member SET point = $1 WHERE id = $2 AND serverid = $3",
      values: [
        targetinfo[0][0]["point"] + interaction.options.getInteger("포인트"),
        interaction.options.getUser("대상").id,
        interaction.guild.id,
      ],
    };
    await executeQuery(afterquery);
    return true;
  }
}

module.exports.transpoint = transpoint;
module.exports.finduser = finduser;
