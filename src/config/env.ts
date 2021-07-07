import logger from "./winston";
import { config } from "dotenv";
import { resolve } from "path";
if (process.env.PROJECT_NAME !== "user-services") {
  logger.info("Setting From Local Env File..");
  config({ path: resolve(__dirname, "../.env.local") });
}
