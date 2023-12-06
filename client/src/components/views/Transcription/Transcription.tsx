import React from 'react';
import { Meeting } from '../../../types/types';
import { Transcription, TranscriptionSegment } from '../../../lib/transcribe';
import './styles.css';
import { Separator } from '@radix-ui/react-separator';

interface TranscriptViewProps {
    meeting: Meeting;
    transcription: Transcription;
}

const TranscriptionView: React.FC<TranscriptViewProps> = ({ meeting, transcription }) => {
  return (
    <div className="view">
      <TranscriptViewHeader meeting={meeting} transcription={transcription} />
      <div className="transcriptBody">
          {
            transcription.getSegments.map((segment) => (
              <TranscriptSegmentSection key={segment.start()} segment={segment} />
            ))
          }
          
        <div>
          <div className="transcriptEndStamp">
            <div>{transcription.durationFormatted()}</div>
            <div>End of Transcript</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TranscriptViewHeader: React.FC<TranscriptViewProps> = ({ meeting, transcription }) => {
  return (
    <div className="transcriptViewHeader">
      <div className="transcriptViewHeaderTitle">Meeting Transcript</div>
      <div>{(new Date(meeting.createdAt)).toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        hour12: true,
        minute: 'numeric',
      })}</div>

      <div>
        { `Transcript length: ${transcription.durationFormatted()}` }
        </div>
    </div>
  );
}

const TranscriptSegmentSection = ({ segment }: {segment: TranscriptionSegment}) => {
  return (
    <div className="transcriptSegment">
      <div className="transcriptSegmentStamp">
        <div>{segment.startFormatted()}</div>
        <div>{segment.speaker()}</div>
      </div>
      
      <div className="transcriptSegmentBody">
        {segment.asString()}
      </div>
    </div>
  )
}


export default TranscriptionView;