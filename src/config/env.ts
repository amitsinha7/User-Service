import logger from "./logger.winston";
import { config } from "dotenv";
import { resolve } from "path";
if (process.env.PROJECT_NAME !== "user-services") {
  logger.info("Setting From Local Env File..");
  config({ path: resolve(__dirname, "../../.example.env") });
}
