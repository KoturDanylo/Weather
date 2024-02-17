import { config } from "dotenv";
config();
export const configs = {
  PORT: process.env.PORT,
  API_KEY: process.env.API_KEY,
};
