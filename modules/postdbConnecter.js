const { Client } = require("pg");
const {
  DATABASE_URL,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_PORT,
} = require("../config");

const client = new Client({
  user: DB_USER,
  host: DATABASE_URL,
  database: "maindb",
  password: DB_PASSWORD,
  port: DB_PORT,
});

const connect = () => {
  client.connect();
};

const disconnect = () => {
  client.end();
};

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    client
      .query(query)
      .then((res) => {
        resolve(res.rows);
      })
      .catch((e) => {
        reject(e.stack);
      });
  });
};

module.exports = {
  connect,
  disconnect,
  executeQuery,
};
