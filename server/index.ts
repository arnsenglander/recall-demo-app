import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { getTranscript } from "./controllers/transcript.ts";
import { createBot, deleteAllBots, getBot, listBots } from "./controllers/bot.ts";
import sequelize from "./db/config.ts";
import { listJobs, getJob } from "./controllers/jobs.ts";
import {
  createIntelligence,
  getIntelligence,
} from "./controllers/intelligence.ts";

configDotenv();

const app = express();
app.use(express.json());
app.use(cors());

// Bots
app.post("/bots", createBot);
app.get("/bots", listBots);
app.delete("/bots", deleteAllBots);
app.get("/bots/:botId", getBot);
app.get("/bots/:botId/transcript", getTranscript);

// Jobs
app.get("/jobs", listJobs);
app.get("/jobs/:jobId", getJob);

// Intelligence
app.get("/bots/:botId/intelligence", getIntelligence);
app.post("/bots/:botId/intelligence", createIntelligence);

// Initialize the database connection and sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to database successfully");

    // Sync all models with the database (create tables)
    await sequelize.sync();
    console.log("All database models synced ✅");

    const port = process.env.SERVER_PORT || 8000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
