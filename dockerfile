FROM arm64v8/node:20.9.0

ENV TOKEN=${{ secrets.TOKEN }}
ENV CLIENTID=${{ secrets.CLIENTID }}
ENV GUILDID=${{ secrets.GUILDID }}
ENV DATABASE_URL=${{ secrets.DATABASE_URL }}
ENV NEISKEY=${{ secrets.NEISKEY }}
ENV GITHUBTOKEN=${{ secrets.GITHUBTOKEN }}

WORKDIR /

RUN npm install

CMD ["node", "main.js"]
