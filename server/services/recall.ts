import fetch from 'node-fetch'

class RecallApi {

  private BASE_URL = 'https://api.recall.ai/api/v1'

  constructor(private apiKey: string) {
      if (!apiKey) throw new Error('API key is required')
  }

  async sendBotToMeeting(meeting_url: string, name: string): Promise<string> {
  
      const resp = await fetch(this.BASE_URL+ '/bot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + this.apiKey,
        },
        body: JSON.stringify({
          meeting_url,
          name: name ?? 'Note Taker Bot',
        })
      })

      if (!resp.ok) {
        const data = await resp.json() 
        console.error('Error sending bot to meeting:', data)
        throw new Error('Error sending bot to meeting')
      }

      const data = await resp.json() as CreateBotResponse
      console.log('response:', data)

      return data.id
  }

  async getTranscript(botId: string): Promise<string> {
  
    const API_KEY = process.env.RECALL_API_KEY;
    if (!API_KEY) throw new Error('RECALL_API_KEY not set');
    
      const url = `https://api.recall.ai/api/v1/bot/${botId}/transcript/`;
      const options = {
        method: 'GET', 
        headers: {
          accept: 'application/json',
          authorization: 'Token ' + API_KEY,
        },
      };

    return fetch(url, options)
      .then(async (res) => {
        const data = await res.json()
        console.log('got bot transcript:', data)
        return 'TODO: replace this transcript placeholder'
      })
      .catch(e => {
        const err = `Error getting bot transcript: ${e}`
        throw new Error(err)
      });
  };
}

type CreateBotResponse = {
  id: string;
  video_url: string | null;
  status_changes: {
    code: string;
    message: string | null;
    created_at: string;
    sub_code: string | null;
  }[];
  meeting_metadata: any | null;
  meeting_participants: any[];
  meeting_url: {
    meeting_id: string;
    meeting_password: string;
    platform: string;
  };
  join_at: string | null;
  calendar_meetings: any[];
  recording: string | null;
  recordings: string[];
};


export default RecallApi