export type Word = {
    text: string;
    start_timestamp: number;
    end_timestamp: number;
  };
  
export type SpeakerData = {
    words: Word[];
    speaker: string;
    language: string | null;
};
  
export type RawTranscriptionData = SpeakerData[];
