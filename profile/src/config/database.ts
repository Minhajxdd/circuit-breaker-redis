import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

async function authenticateDbConnection() {
  try {
    await sequelize.authenticate();
    console.log("Database Connection has been established successfully.");
    await sequelize.sync({ alter: true });
    console.log("Database syncing done..");
  } catch (err: any) {
    console.log(err.message);
  }
}

export { authenticateDbConnection };

export default sequelize;
