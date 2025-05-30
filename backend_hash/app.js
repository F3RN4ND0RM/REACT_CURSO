import express from "express";
import morgan from "morgan";
import cors from "cors";
import indexRoutes from "./routes/index.routes.js";
import loginRoutes from "./routes/login.routes.js";
import itemRoutes from "./routes/item.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(indexRoutes);
app.use(loginRoutes);
app.use(itemRoutes);

export default app;
