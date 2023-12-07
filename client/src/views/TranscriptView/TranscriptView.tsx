import React from 'react';
import { Transcription, TranscriptionSegment } from '../../lib/transcribe';
import './styles.css';
import { Bot } from '../../../../types';
import { prettifyDate } from '../../lib/dates';
import UserBadge from '../../components/UserBadge/UserBadge';
import IntelligenceSummary from '../../components/IntelligenceSummary/IntelligenceSummary';

interface TranscriptViewProps {
  bot: Bot;
  transcription: Transcription;
}

const TranscriptionView: React.FC<TranscriptViewProps> = ({ bot, transcription }) => {
  return (
    <div className="view">
      <TranscriptViewHeader bot={bot} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 0.7}}>
          <TranscriptBody transcript={transcription} /> 
        </div>
        <div style={{ flex: 0.3 }}>
          <IntelligenceSummary bot={bot} />
        </div>
      </div>
    </div>
  );
}

const TranscriptViewHeader = ({ bot }: { bot: Bot }) => {

  const getPlatformLabel = (platform: string) => {
    switch (platform) {
      case 'google_meet':
        return 'Google Meet';
      case 'zoom':
        return 'Zoom';
      default:
        return platform;
    }
  }

  return (
    <div className="transcriptViewHeader">
      <div className="transcriptViewHeaderTitle">{getPlatformLabel(bot.meeting_url.platform)} Call</div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div>{prettifyDate(bot.join_at)}</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {
            bot.meeting_participants.map((participant) => (
              <UserBadge key={participant.id} label={participant.name} />
            ))
          }
        </div>
      </div>
    </div>
  );
}

const TranscriptBody = ({transcript}: {transcript: Transcription}) => {
  return (
   <div className="transcriptBody">
      {transcript.getSegments.map((segment) => (
          <TranscriptSegmentSection key={segment.start()} segment={segment} />
        ))}
      <div>
        <div className="transcriptEndStamp">
          <div>{transcript.durationFormatted()}</div>
          <div>End of Transcript</div>
        </div>
      </div>
    </div>
  )
}

const TranscriptSegmentSection = ({ segment }: {segment: TranscriptionSegment}) => {
  return (
    <div className="transcriptSegment">
      <div className="transcriptSegmentStamp">
        <div>[{segment.startFormatted()}]</div>
        <div>{segment.speaker()}</div>
      </div>
      
      <div className="transcriptSegmentBody">
        {segment.asString()}
      </div>
    </div>
  )
}

export default TranscriptionView;