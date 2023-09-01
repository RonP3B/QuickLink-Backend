import Sequelize from "sequelize";
import pg from "pg";

const sequelizeObj = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "postgres",
    dialectModule: pg,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialectOptions: { ssl: true },
  }
);

export default sequelizeObj;
