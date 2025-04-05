import { createHandler } from "vercel-node-server";
import path from "path";
import { readFileSync, writeFileSync } from "fs";

const handler = createHandler();

const dataPath = path.join(process.cwd(), "data", "cities.json");

// GET all cities
handler.get("/api/cities", (req, res) => {
  const cities = JSON.parse(readFileSync(dataPath, "utf8"));
  res.json(cities);
});

// POST new city
handler.post("/api/cities", (req, res) => {
  const cities = JSON.parse(readFileSync(dataPath, "utf8"));
  const newCity = req.body;

  // Generate a new ID
  const newId = Math.max(0, ...cities.map((city) => city.id)) + 1;
  newCity.id = newId;

  cities.push(newCity);
  writeFileSync(dataPath, JSON.stringify(cities, null, 2));

  res.status(201).json(newCity);
});

export default handler;
