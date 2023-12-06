import React, { useEffect, useState } from 'react';
import Sidebar from './components/SideBar/Sidebar';
import TranscriptionView from './components/views/Transcription/Transcription';
import { CreateBotRequest, Meeting } from './types/types';
import './App.css';
import useMeetings from './hooks/meetings';
import useTranscript from './hooks/transcript';
import { FileTextIcon } from '@radix-ui/react-icons';

const App: React.FC = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

  const { meetings, loading: meetingsLoading, error: meetingsError } = useMeetings();
  const { transcript, loading: transcriptLoading, error: transcriptError, fetchTranscript } = useTranscript();
  
  useEffect(() => {
    if (selectedMeeting) {
      fetchTranscript(selectedMeeting.id);
    }
  }, [selectedMeeting]);

  const handleSelectMeeting = (meeting: Meeting) => setSelectedMeeting(meeting);
  const handleSendBot = async (bot: CreateBotRequest) => {
    await createBot(bot);
  };

  const loading = meetingsLoading;
  const error = meetingsError || transcriptError;

  return (
    <div>
      {
        error ? <p>{JSON.stringify(error)}</p> : 
          loading ? <p>Loading...</p> :
        (
        <div className="root">
          <Sidebar
            meetings={meetings} 
            onSelectMeeting={handleSelectMeeting} 
            onSendBot={handleSendBot} 
          />
          <div className="content">
            {selectedMeeting ? (
              transcript ? (
                <TranscriptionView meeting={selectedMeeting} transcription={transcript} />
              ) : (
                <p>No transcription found</p>
              )
            ) : (
              <div className="welcome">
                <FileTextIcon height={32} width={32} />
                <p>
                  {meetings.length === 0 ?
                    'Create your first bot to get started.' :
                    'Select a meeting to view the transcript.'}
                </p>
              </div>
            )}
          </div>
          </div>
        )
      }
    </div>
  );
};

async function createBot(data: CreateBotRequest) {
  const response = await fetch('/api/bot', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
}

export default App;