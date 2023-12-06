import React, { useEffect, useState } from 'react';
import Sidebar from './components/SideBar/Sidebar';
import TranscriptionView from './components/views/Transcription/Transcription';
import { Bot, CreateBotRequest } from '../../types';
import './App.css';
import useTranscript from './hooks/transcript';
import { FileTextIcon } from '@radix-ui/react-icons';
import useBots from './hooks/bots';

const App: React.FC = () => {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  const { bots, loading: botsLoading, error: botsError } = useBots();
  const { transcript, loading: transcriptLoading, error: transcriptError, fetchTranscript } = useTranscript();
  
  useEffect(() => {
    if (selectedBot) {
      fetchTranscript(selectedBot.id);
    }
  }, [selectedBot]);

  const handleSelectedBot = (bot: Bot) => {
    setSelectedBot(bot);
  };

  const handleSendBot = async (bot: CreateBotRequest) => {
    await createBot(bot);
  };

  const loading = botsLoading || transcriptLoading;
  const error = botsError || transcriptError;

  return (
    <div>
      {
        error ? <p>{JSON.stringify(error)}</p> : 
          loading ? <p>Loading...</p> :
        (
        <div className="root">
          <Sidebar
            bots={bots}
            onSelectedBot={handleSelectedBot} 
            onSendBot={handleSendBot} 
          />
          <div className="content">
            {selectedBot ? (
              transcript ? (
                <TranscriptionView bot={selectedBot} transcription={transcript} />
              ) : (
                <p>No transcription found</p>
              )
            ) : (
              <div className="welcome">
                <FileTextIcon height={32} width={32} />
                <p>
                  {bots.length === 0 ?
                    'Create your first bot to get started.' :
                    'Select a bot to view the transcript.'}
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