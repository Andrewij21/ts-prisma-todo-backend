import dotenv from "dotenv";
import app from "./src/index";

dotenv.config();
const port = process.env.port || 9999;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
