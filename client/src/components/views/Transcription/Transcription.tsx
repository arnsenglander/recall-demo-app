import React from 'react';
import { Meeting } from '../../../types/meeting';
import './styles.css';

interface TranscriptionViewProps {
    meeting: Meeting;
    transcription: string;
}

const TranscriptionView: React.FC<TranscriptionViewProps> = ({ meeting, transcription }) => {
  return (
    <div className="view">
      <h2>{meeting.title}</h2>
      <p><strong>Transcription:</strong> {transcription}</p>
      <ul>
        <strong>Action Items:</strong>
        {meeting.actionItems.map((actionItem, index) => (
          <li key={index}>{actionItem}</li>
        ))}
      </ul>
      {/* Add more details as needed */}
    </div>
  );
};

export default TranscriptionView;