import { Request, RequestHandler, Response } from 'express';
import Meeting from '../models/meeting.ts';

export const listMeetings: RequestHandler = async function listMeetings(_req: Request, res: Response) {
  try {
    const meetings = await Meeting.findAll();
    res.json({ meetings })
  } catch(e) {
    console.error('Error getting bot meetings:', e)
    res.status(500).json({ message: 'Error getting bot meetings' });
  }
}