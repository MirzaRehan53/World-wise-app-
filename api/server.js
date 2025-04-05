import express from "express";
import jsonServer from "json-server";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const app = express();

const router = jsonServer.router(join(__dirname, "../data/cities.json"));
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(router);

export default app;
