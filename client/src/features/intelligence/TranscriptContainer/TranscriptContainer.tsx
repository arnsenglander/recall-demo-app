import './styles.css';
import { Transcription, TranscriptionSegment } from '@/lib/transcribe';
import { Bot } from 'types/bot'
import SummaryContainer from '@/features/intelligence/SummaryContainer/SummaryContainer';

interface TranscriptContainerProps {
  bot: Bot;
  transcript: Transcription;
}

const TranscriptContainer = ({ bot, transcript }: TranscriptContainerProps) => {
  return (
    <div className="transcriptContainer">
        <TranscriptBody transcript={transcript} /> 
        <SummaryContainer bot={bot} />
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

export default TranscriptContainer;