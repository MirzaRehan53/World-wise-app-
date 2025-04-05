import { createHandler } from "vercel-node-server";
import path from "path";
import { readFileSync, writeFileSync } from "fs";

const handler = createHandler();

const dataPath = path.join(process.cwd(), "data", "cities.json");

// GET city by ID
handler.get("/api/cities/:id", (req, res) => {
  const cities = JSON.parse(readFileSync(dataPath, "utf8"));
  const city = cities.find((c) => c.id === parseInt(req.params.id));

  if (!city) {
    return res.status(404).json({ error: "City not found" });
  }

  res.json(city);
});

// DELETE city
handler.delete("/api/cities/:id", (req, res) => {
  const cities = JSON.parse(readFileSync(dataPath, "utf8"));
  const filteredCities = cities.filter((c) => c.id !== parseInt(req.params.id));

  writeFileSync(dataPath, JSON.stringify(filteredCities, null, 2));

  res.json({ success: true });
});

export default handler;
