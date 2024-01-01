const { executeQuery } = require("../modules/postdbConnecter");

async function finduser(interaction, type) {
  if (type == "user") {
    targetuser = interaction.user.id;
  } else {
    targetuser = interaction.options.getUser("대상").id;
  }
  userinfo = await executeQuery(
    `SELECT * FROM member WHERE userid = ${
      targetuser.toString() + interaction.guild.id.toString()
    }`
  );
  serverinfo = await executeQuery(
    `SELECT * FROM server WHERE id = ${interaction.guild.id}`
  );
  if (userinfo.length == []) {
    const query = {
      text: "INSERT INTO member(id, point, createdat, level, state, exp, serverid, userid) VALUES($1, $2, $3, $4, $5, $6, $7, $8)",
      values: [
        targetuser,
        1,
        new Date(),
        1,
        true,
        1,
        interaction.guild.id,
        targetuser.toString() + interaction.guild.id.toString(),
      ],
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
      text: "UPDATE member SET point = $1 WHERE userid = $2",
      values: [
        origininfo[0][0]["point"] - interaction.options.getInteger("포인트"),
        interaction.user.id.toString() + interaction.guild.id.toString(),
      ],
    };
    await executeQuery(originquery);
    const afterquery = {
      text: "UPDATE member SET point = $1 WHERE userid = $2",
      values: [
        targetinfo[0][0]["point"] + interaction.options.getInteger("포인트"),
        interaction.options.getUser("대상").id.toString() +
          interaction.guild.id.toString(),
      ],
    };
    await executeQuery(afterquery);
    return true;
  }
}

async function addpoint(interaction, point) {
  origininfo = await finduser(interaction, "user");
  console.log(origininfo[0][0]["point"] + point);
  const query = {
    text: "UPDATE member SET point = $1 WHERE userid = $2",
    values: [
      (origininfo[0][0]["point"] + point).toFixed(1),
      interaction.user.id.toString() + interaction.guild.id.toString(),
    ],
  };
  await executeQuery(query);
}

async function pointRanking(interaction) {
  const serverinfo = await executeQuery(
    `SELECT * FROM member WHERE serverid = ${interaction.guild.id} ORDER BY point DESC LIMIT 10`
  );
  console.log(serverinfo);
  return serverinfo;
}

module.exports.transpoint = transpoint;
module.exports.finduser = finduser;
module.exports.addpoint = addpoint;
module.exports.pointRanking = pointRanking;
