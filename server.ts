import dotenv from "dotenv";
import app from "./src/index";
import logger from "./src/utils/logger";

dotenv.config();
const port = process.env.port || 9999;

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});
