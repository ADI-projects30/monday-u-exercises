// Express boilerplate, hosting the `dist` file, connecting to the routes
import taskRouter from "./server/routes/api.js";
import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { logger } from "./middleware/logger.js";
import compression from "compression";
import dotenv from "dotenv";

dotenv.config();

const assetFolder = path.resolve(process.cwd(), "dist/");
const port = process.env.PORT;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/tasks", express.static(assetFolder));
app.use(cors());
app.use(morgan("common"));
app.use([logger, compression(), express.json()]);
app.use("/", taskRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
