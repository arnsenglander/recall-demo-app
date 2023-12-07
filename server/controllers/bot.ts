import { Request, Response, RequestHandler } from 'express';
import RecallApi from '../services/recall.ts';
import Meeting from '../models/meeting.ts';

export const createBot: RequestHandler = async (req: Request, res: Response) => {
  const { meeting_url, name } = req.body;
  
  const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? '');

  try {
    // Send the bot to the meeting
    const bot = await recallApi.sendBotToMeeting(meeting_url, name);
    console.log('Bot', bot);

    // Save meeting to the database
    const createdMeeting = await Meeting.create({
        recall_bot_id: bot.id,
        meeting_url: meeting_url,
    })

    res.status(200).json({ created_meeting: createdMeeting });
  } catch (e) {
    console.log('Error sending bot to meeting:', e);
    res.status(500).json({ message: 'Error sending bot to meeting' });
  }
}

export const listBots: RequestHandler = async (_req: Request, res: Response) => {
  const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? '');

  try {
    const bots = await recallApi.listBots();
    res.status(200).json({ bots: bots });
  } catch (e) {
    console.log('Error listing bots:', e);
    res.status(500).json({ message: 'Error listing bots' });
  }
}

export const getBot: RequestHandler = async (req: Request, res: Response) => {
  const { botId } = req.params;
  const recallApi = new RecallApi(process.env.RECALL_API_KEY ?? '');

  try {
    const bot = await recallApi.getBot(botId);
    console.log('Bot', bot);

    res.status(200).json({ bot: bot });
  } catch (e) {
    console.log('Error getting bot:', e);
    res.status(500).json({ message: 'Error getting bot' });
  }
}
