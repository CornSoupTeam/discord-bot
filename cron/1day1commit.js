const { githubController } = require("../modules/dbConnecter");
const { GraphQLClient } = require("graphql-request");
const { Client, GatewayIntentBits } = require("discord.js");
const { token, GITHUB_TOKEN } = require("../config");
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function main(github_username, userId, guildId, channelId, client) {
  const today = new Date().toISOString().slice(0, 10);

  const graphQLClient = new GraphQLClient("https://api.github.com/graphql", {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
  });

  const query = `
    query {
      user(login: "${github_username}") {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await graphQLClient.request(query);
    const contributions =
      data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week) => week.contributionDays
      );

    const todayContributions = contributions.find((day) => day.date === today);
    if (todayContributions && todayContributions.contributionCount === 0) {
      try {
        client.guilds.cache
          .get(guildId)
          .channels.cache.get(channelId)
          .send(`<@${userId}>님, 1일 1커밋이 아직 이루어지지 않았어요`);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}
(async () => {
  try {
    const documents = await githubController.find({}).exec();

    for (const document of documents) {
      await main(
        document["githubId"],
        document["userId"],
        document["guildId"],
        document["channelId"],
        client
      );
    }
  } catch (error) {
    console.error("에러 발생:", error);
  } finally {
    return;
  }
})();

client.login(token);

client.once("ready", () => {
  (async () => {
    try {
      const documents = await githubController.find({}).exec();

      for (const document of documents) {
        await main(
          document["githubId"],
          document["userId"],
          document["guildId"],
          document["channelId"],
          client
        );
      }
    } catch (error) {
      console.error("에러 발생:", error);
    } finally {
      return;
    }
  })();
  console.log("✔️ | 메시지 전송이 완료되었습니다.");
  process.exit();
});
