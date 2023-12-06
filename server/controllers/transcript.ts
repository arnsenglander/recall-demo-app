import { RequestHandler } from "express";
import RecallApi from "../services/recall.ts";
import Meeting from "../models/meeting.ts";

export const getMeetingTranscript: RequestHandler = async (req, res) => {
  
  try {
    const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? '');

    // Find the Meeting in the database based on the meeting_id.
    const { meeting_id } = req.query;
    const meeting = await Meeting.findOne({ where: { id: meeting_id } });
    
    if (!meeting) {
      res.status(404).json({ message: 'Meeting not found' });
      return;
    }

    const transcript = await recallApi.getTranscriptionData(meeting.recall_bot_id)
    res.json({ transcript })
  } catch(e) {
    console.log('Error getting bot transcript:', e)
    res.status(500).json({ message: 'Error getting bot transcript' });
    return;
  }
}
