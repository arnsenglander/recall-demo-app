import { useState } from "react";
import { Transcriber, Transcription } from "../lib/transcribe";
import { RawTranscriptionData } from "../../../types";

export interface TranscriptData {
  transcript: Transcription | null;
  loading: boolean;
  error: string | null;
  fetchTranscript: (meetingId: string) => void;
}

export const useTranscript = (): TranscriptData => {
  const [transcript, setTranscript] = useState<Transcription | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTranscript = async (botId: string) => {
    if (!botId) {
      setError("No bot ID provided");
      return;
    }

    try {
      const response = await fetch(`/api/bots/${botId}/transcript`);
      const data = (await response.json()) as {
        transcript: RawTranscriptionData;
      };
      const transcript = Transcriber.transcribe(data.transcript);
      setTranscript(transcript);
    } catch (error) {
      console.error(error);
      setError("Error fetching transcript");
    } finally {
      setLoading(false);
    }
  };

  return { transcript, loading, error, fetchTranscript };
};

export default useTranscript;
