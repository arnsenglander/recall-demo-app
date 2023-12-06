import { RequestHandler } from "express";
import RecallApi from "../services/recall.ts";

export const getTranscript: RequestHandler = async (req, res) => {
  
  try {
    const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? '');

    const { botId } = req.params;
   
    console.log('getting bot transcript for bot:', botId)
    const transcript = await recallApi.getTranscriptionData(botId)
    res.json({ transcript })
  } catch(e) {
    console.log('Error getting bot transcript:', e)
    res.status(500).json({ message: 'Error getting bot transcript' });
    return;
  }
}
