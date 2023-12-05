import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import { getMeetingTranscript } from './controllers/transcript.ts';
import { listMeetings } from './controllers/meeting.ts';
import { sendBotHandler } from './controllers/bot.ts';
import sequelize from './db/config.ts';

configDotenv()

const app = express();
app.use(express.json());
app.use(cors());

app.post('/send-bot', sendBotHandler);
app.get('/meetings', listMeetings);
app.get('/transcript/:meeting_id', getMeetingTranscript);

// Initialize the database connection and sync models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database successfully');
    
    // Sync all models with the database (create tables)
    await sequelize.sync();
    console.log('All database models synced ✅');
    
    const port = 3000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
