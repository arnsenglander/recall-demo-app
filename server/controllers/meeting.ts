import { Request, RequestHandler, Response } from 'express';
import Meeting from '../models/meeting.ts';

export const listMeetings: RequestHandler = async function listMeetings(_req: Request, res: Response) {
  try {
    const meetings = await Meeting.findAll();
    res.json({ meetings })
  } catch(e) {
    console.log('Error getting bot meetings:', e)
    res.status(500).json({ message: 'Error getting bot meetings' });
  }
}

export const createMeeting: RequestHandler = async function createMeeting(req: Request, res: Response) {
    const { recall_bot_id, meeting_url, name } = req.body;
    
    try {
        const createdMeeting = await Meeting.create({
            recall_bot_id: recall_bot_id,
            meeting_url: meeting_url,
            name: name,
        });
        res.json({ created_meeting: createdMeeting });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating meeting in the database' });
    }
}