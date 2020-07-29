module.exports = {
  development: {
    port: process.env.PORT,
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: "tom",
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
  test: {
    port: process.env.PORT,
    username: process.env.DATABASE_ID,
    password: process.env.DATABASE_PASSWORD,
    database: "tom",
    host: process.env.DB_HOST,
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
  secret: {
    tomKey: process.env.SVS,
  },
  TRACKING_KEY: process.env.TRACKING_KEY,
};
