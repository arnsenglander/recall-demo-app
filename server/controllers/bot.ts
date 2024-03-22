import { Request, Response, RequestHandler } from "express";
import RecallApi from "../services/recall.ts";
import Meeting from "../models/meeting.ts";
import fetch from "node-fetch";

export const createBot: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const { meeting_url, name } = req.body;
  const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? "");

  try {
    const bot = await recallApi.sendBotToMeeting(meeting_url, name);
    const createdMeeting = await Meeting.create({
      recall_bot_id: bot.id,
      meeting_url: meeting_url,
    });

    res.status(200).json({ created_meeting: createdMeeting });
  } catch (e) {
    console.log("Error sending bot to meeting:", e);
    res.status(500).json({ message: "Error sending bot to meeting" });
  }
};

export const listBots: RequestHandler = async (
  _req: Request,
  res: Response,
) => {
  const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? "");
  try {
    const bots = await recallApi.listBots();
    
    
    res.status(200).json({ bots: bots });
  } catch (e) {
    console.log("Error listing bots:", e);
    res.status(500).json({ message: "Error listing bots" });
  }
};

export const deleteAllBots: RequestHandler = async (
  _req: Request,
  res: Response,
) => {
  const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? "");
  try {
    const resp = await recallApi.listBots();
  
    const results = resp.results;
    
    
    const deletePromises = results.map(bot => {
      // console.log('bot :', bot.id);
      
      
      const url = `https://api.recall.ai/api/v1/bot/${bot.id}/`;
      const options = {
        method: 'DELETE',
        headers: { Authorization: 'Token ce7797c5ddb4722bdfb49c56336c27751d66dcb8' },
      };
      return fetch(url, options)
        .then(response => {
          if (!response.ok) {
            throw new Error(`Failed to delete bot with ID ${bot.id}, status code: ${response.status} `);
          }
          return response.json(); // Ensure you return the promise here
        })
        .catch(err => console.error('error deleting bot:', err));
    });
    await Promise.all(deletePromises);
    res.status(200).json({ message: "All bots deleted successfully" });
  } catch (e) {
    console.log("Error deleting bots:", e);
    res.status(500).json({ message: "Error deleting bots" });
  }
};

export const getBot: RequestHandler = async (req: Request, res: Response) => {
  const { botId } = req.params;
  const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? "");

  try {
    const bot = await recallApi.getBot(botId);
    res.status(200).json({ bot: bot });
  } catch (e) {
    console.log("Error getting bot:", e);
    res.status(500).json({ message: "Error getting bot" });
  }
};
