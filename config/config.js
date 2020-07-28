module.exports = {
  development: {
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: "tom",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: "tom",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false,
  },
  production: {
    port: process.env.PORT,
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: "tom",
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
};
