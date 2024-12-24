import mongoose from "mongoose";
import { logger } from "../config/winston.config.js";
mongoose.set("strictQuery", false);
const databaseConnection = () => {
  mongoose.connect(process.env.DATABASE_URI).then(() => {
    logger.info("Database Connected Successfully");
  });
};

export default databaseConnection;
