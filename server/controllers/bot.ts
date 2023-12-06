import { Request, Response, RequestHandler } from 'express';
import RecallApi from '../services/recall.ts';
import Meeting from '../models/meeting.ts';

export const sendBotHandler: RequestHandler = async (req: Request, res: Response) => {
  const { meeting_url, name } = req.body;
  
  const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? '');

  try {
    // Send the bot to the meeting
    const botId = await recallApi.sendBotToMeeting(meeting_url, name);
    console.log('Bot ID:', botId);

    // Save meeting to the database
    const createdMeeting = await Meeting.create({
        recall_bot_id: botId,
        meeting_url: meeting_url,
    })

    res.status(200).json({ created_meeting: createdMeeting });
  } catch (e) {
    console.log('Error sending bot to meeting:', e);
    res.status(500).json({ message: 'Error sending bot to meeting' });
  }
}