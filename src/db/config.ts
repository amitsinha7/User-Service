const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    encrypt: process.env.DB_ENCRYPT,
    pool: {
      max: Number(process.env.DB_POOL_MAX),
      min: Number(process.env.DB_POOL_MIN),
      acquire: Number(process.env.DB_POOL_ACQUIRE),
      idle: Number(process.env.DB_POOL_IDLE)
    }
  }
};
