import { SentimentAnalysisResult } from 'types/intelligence';
import Chip from '@/components/Chip/Chip';
import { Intelligence } from '@/hooks/intelligence';
import { toTitleCase } from '@/lib/strings';
import './styles.css';

interface SentimentAnalysisContainerProps {
    intelligence: Intelligence;
}

const SentimentAnalysisContainer = ({ intelligence }: SentimentAnalysisContainerProps) => {
    const results = intelligence.getSentimentResults();
    return (
        <div className="sentimentAnalysisContainer">
            <div className="sentimentAnalysisTitleContainer">
                <div className="sentimentAnalysisTitle">Sentiment Analysis</div>
            </div>
          {results.map((result, index) => (
            <SentimentAnalysisSegment key={index} result={result} />
          ))}
          {results.length === 0 && <p>No sentiment analysis results available.</p>}
        </div>
    );
};

const SentimentAnalysisSegment = ({result}: {result: SentimentAnalysisResult}) => {

    const getColorForSentiment = (sentiment: string) => {
        switch (sentiment) {
            case 'POSITIVE':
                return '#33B074';
            case 'NEGATIVE':
                return '#E5484D';
            case 'NEUTRAL':
                return '#F5E147';
            default:
                return '#ffffff';
        }
    }

    const msToTime = (duration: number) => {
        const minutes = Math.floor(duration / 60000);
        const seconds = ((duration % 60000) / 1000).toFixed(0);
        if (seconds.length === 1) {
            return `${minutes}:0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }
    
    return (
        <div className="sentimentResult">
            <div className="sentimentResultTextContainer">
                <div className="sentimentResultTimestamp">{msToTime(result.start)}</div>
                <p className="sentimentResultText">{result.text}</p>
            </div>
            <div className="sentimentResultDivider" />
            <div className="sentimentResultAnalysis">
                <Chip label={toTitleCase(result.sentiment)} color={getColorForSentiment(result.sentiment)} />
                <ConfidenceLabel confidence={result.confidence} />
            </div>
        </div>
    );
};

const ConfidenceLabel = ({confidence}: {confidence: number}) => {
    const toPercentString = (confidence: number) => {
        const percent = confidence * 100;
        return `${percent.toFixed(1)}%`;
    }

    return (
        <div className="confidenceLabel">
            {toPercentString(confidence)} Confidence
        </div>
    );
}


export default SentimentAnalysisContainer;