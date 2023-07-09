interface appConfig {
  APP_NAME: string;
  APP_PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASS: string;
  DB_DIALECT: string;
  JWT_SECRET: string;
  JWT_EXPIRED: string;
}

/**
 * 
 */
export const AppConfig: appConfig = {
    APP_NAME: String(process.env.APP_NAME),
    APP_PORT: parseInt(process.env.APP_PORT ?? "0"),
    DB_HOST: String(process.env.DB_HOST),
    DB_PORT: 0,
    DB_NAME: String(process.env.DB_NAME),
    DB_USER: String(process.env.DB_USER),
    DB_PASS: String(process.env.DB_PASS),
    DB_DIALECT: String(process.env.DB_DIALECT),
    JWT_SECRET: String(process.env.JWT_SECRET),
    JWT_EXPIRED: String(process.env.JWT_EXPIRED)
}

