module.exports = {
  development: {
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: "tom",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: "tom",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: "tom",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
