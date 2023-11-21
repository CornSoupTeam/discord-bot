const { githubController } = require("../modules/dbConnecter");
const { GraphQLClient } = require("graphql-request");
const { GITHUB_TOKEN } = require("../config.json");

async function main(github_username, userId, channelId, client) {
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
        client.channels.cache
          .get(channelId)
          .send(`<@${userId}>님, 1일 1커밋이 아직 이루어지지 않았어요`);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

if (require.main === module) {
  main();
}
