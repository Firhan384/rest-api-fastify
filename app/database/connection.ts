import { Sequelize, Dialect } from "sequelize";
import { AppConfig } from "../configs/app.config";

/**
 * instanceDB just variable global to access with models
 */
export const instanceDB = new Sequelize(AppConfig.DB_NAME, AppConfig.DB_USER, AppConfig.DB_PASS, {
  host: AppConfig.DB_HOST,
  port: AppConfig.DB_PORT,
  dialect: AppConfig.DB_DIALECT as Dialect,
});

/**
 * connectDB for connecting to database
 */
export const connectDB = async () => {
  try {
    await instanceDB.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(0);
  }
};
