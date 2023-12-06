import React from 'react';
import { Meeting } from '../../../types/types';
import './styles.css';
import { Transcription } from '../../../lib/transcribe';

interface TranscriptionViewProps {
    meeting: Meeting;
    transcription: Transcription;
}

const TranscriptionView: React.FC<TranscriptionViewProps> = ({ meeting, transcription }) => {
  return (
    <div className="view">
      <h2>{meeting.meeting_url}</h2>
      <p><strong>Transcription:</strong> {transcription.asString()}</p>
      <ul>
        <strong>Segments:</strong>
        {transcription.getSegments.map((segment, index) => (
          <li key={index}>{segment.asString()}</li>
        ))}
      </ul>
      {/* Add more details as needed */}
    </div>
  );
};

export default TranscriptionView;