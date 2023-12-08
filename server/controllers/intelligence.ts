import { Request, Response, RequestHandler } from "express";
import RecallApi from "../services/recall.ts";

export const getIntelligence: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { botId } = req.params;
  const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? "");

  try {
    const intelligence = await recallApi.getBotIntelligence(botId);

    // If it's an empty object, return a 404
    if (Object.keys(intelligence).length === 0) {
      res.status(404).json({ message: "Intelligence not found" });
    } else {
      res.status(200).json({ intelligence });
    }
  } catch (e) {
    console.log("Error getting transcript:", e);
    res.status(500).json({ message: "Error getting transcript" });
  }
};

/**
 * Asynchronously create a bot intelligence job.
 */
export const createIntelligence: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { botId } = req.params;
  const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? "");

  try {
    await recallApi.analyzeBotMedia(botId);
    res.status(200).json({ message: "Intelligence job started" });
  } catch (e) {
    console.log("Error getting transcript:", e);
    res.status(500).json({ message: "Error getting transcript" });
  }
};
