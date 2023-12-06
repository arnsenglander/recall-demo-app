import { useState, useEffect, useContext, createContext } from 'react';
import { Meeting } from '../types/types';

export interface MeetingsData {
  meetings: Meeting[];
  loading: boolean;
  error: string | null;
}

export const useMeetings = (): MeetingsData => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch('/api/meetings');
        const data = await response.json() as { meetings: Meeting[]}
        setMeetings(data.meetings);
      } catch (error) {
        console.error(`Error fetching meetings: ${error}`);
        setError('Error fetching meetings');
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  return { meetings, loading, error };
};

export default useMeetings;

interface MeetingContextProps {
  children: React.ReactNode;
}

const MeetingContext = createContext<MeetingsData | undefined>(undefined);

export const MeetingProvider: React.FC<MeetingContextProps> = ({ children }) => {
  const { meetings, loading, error } = useMeetings();

  return (
    <MeetingContext.Provider value={{ meetings, loading, error }}>
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeetingContext = () => {
  const context = useContext(MeetingContext);

  if (!context) {
    throw new Error('useMeetingContext must be used within a MeetingProvider');
  }

  return context;
}