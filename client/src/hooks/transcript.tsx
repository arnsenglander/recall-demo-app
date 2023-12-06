import { useState, useEffect, useContext, createContext } from 'react';
import { Transcriber, Transcription } from '../lib/transcribe';
import { RawTranscriptionData } from '../../../types';

export interface TranscriptData {
  transcript: Transcription | null;
  loading: boolean;
  error: string | null;
  fetchTranscript: (meetingId: string) => void;
}

export const useTranscript = (): TranscriptData => {
  const [transcript, setTranscript] = useState<Transcription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTranscript = async (meetingId: string) => {
    if (!meetingId) {
      setError('No meeting ID provided');
      return;
    }

    try {
      const response = await fetch(`/api/transcript?meetingId=${meetingId}`);
      const data = await response.json() as { transcript: RawTranscriptionData }
      const transcript = Transcriber.transcribe(data.transcript);
      setTranscript(transcript);
    } catch (error) {
      console.error(error)
      setError('Error fetching transcript');
    } finally {
      setLoading(false);
    }
  };

  return { transcript, loading, error, fetchTranscript };
};

export default useTranscript;

interface TranscriptContextProps {
  children: React.ReactNode;
  meetingId: string;
}

const TranscriptContext = createContext<TranscriptData | undefined>(undefined);

export const TranscriptProvider: React.FC<TranscriptContextProps> = ({ children, meetingId }) => {
  const { transcript, loading, error, fetchTranscript } = useTranscript();

  useEffect(() => {
    fetchTranscript(meetingId);
  })

  return (
    <TranscriptContext.Provider value={{ transcript, loading, error, fetchTranscript }}>
      {children}
    </TranscriptContext.Provider>
  );
};

export const useTranscriptContext = () => {
  const context = useContext(TranscriptContext);

  if (!context) {
    throw new Error('useTranscriptContext must be used within a TranscriptProvider');
  }

  return context;
};