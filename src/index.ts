import express, { Express, Request, Response } from "express";
import routes from "./routes";
import error from "./middleware/errors";

const app: Express = express();

app.use(express.json());
app.use(routes);
app.use(error);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;
