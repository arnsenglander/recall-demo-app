import React, { useState } from 'react';
import Sidebar from './components/SideBar/Sidebar';
import TranscriptionView from './components/views/Transcription/Transcription';
import { Meeting } from './types/meeting';
import './App.css';

const App: React.FC = () => {
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  
  // TODO: Hook for transcriptions

  const meetings: Meeting[] = [
    {
      id: '1',
      title: 'Meeting 1',
      actionItems: ['Action item 1', 'Action item 2'],
    },
    {
      id: '2',
      title: 'Meeting 2',
      actionItems: ['Action item 1', 'Action item 2'],
    },
    {
      id: '3',
      title: 'Meeting 3',
      actionItems: ['Action item 1', 'Action item 2'],
    },
  ]

  const handleSelectMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    // Fetch meeting details (transcription, action items, etc.) based on the selected meeting
    // You might use state management like Redux or context API for handling data fetching
  };

  const handleSendBot = () => {
    // Implement logic to send bot to the selected meeting
    console.log('Bot sent to meeting:', selectedMeeting);
    // TODO: Bot hook
  };

  return (
    <div >
      <Sidebar
        meetings={meetings} 
        onSelectMeeting={handleSelectMeeting} 
        onSendBot={handleSendBot} 
      />
      <div className="content">
        {selectedMeeting ? (
          <TranscriptionView meeting={selectedMeeting} transcription="This is a transcription" />
        ) : (
          <p>Select a meeting from the sidebar</p>
        )}
      </div>
    </div>
  );
};

export default App;