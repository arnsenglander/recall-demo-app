import { useState, useEffect } from 'react';
import { IntelligenceResultsResponse } from '../../../types';

export interface IntelligenceHook {
    intelligence: Intelligence | null;
    message: string;
    loading: boolean;
    error: string | null;
    createIntelligence(botId: string): void;
}

const useIntelligence = (botId: string): IntelligenceHook => {
    const [intelligence, setIntelligence] = useState<Intelligence | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string>('');

    const reset = () => {
        setLoading(true);
        setError(null);
        setMessage('');
        setIntelligence(null);
    }

    const fetchIntelligence = async (botId: string) => {
        reset()

        if (!botId) {
            setError('No bot ID provided');
            return;
        }
    
        try {
            const response = await fetch(`/api/bots/${botId}/intelligence`);
            
            // If it's a 404, no intelligence exists yet. 
            if (response.status === 404) {
                return;
            }

            const data = await response.json() as { intelligence: IntelligenceResultsResponse };
            if (!data.intelligence) {
                setError('No intelligence found');
                return;
            }

            console.log('intelligence response:', data)            
            setIntelligence(new Intelligence(data.intelligence));
        } catch (error) {
            console.error(error)
            setError('Error fetching intelligence');
        } finally {
            setLoading(false);
        }
    };
  
    const createIntelligence = async (botId: string) => {
        if (!botId) {
            setError('No bot ID provided');
            return;
        }

        if (intelligence) {
            setError('Intelligence already exists');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await fetch(`/api/bots/${botId}/intelligence`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    summarization: true,
                    sentiment_analysis: true,
                    entity_detection: true
                })
            });

            // Set a message to let the user know to wait for the job to finish
            setMessage('Generating summary...');
        } catch (error) {
            console.error(error)
            setError('Error fetching summary');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchIntelligence(botId);
    }, [botId]);
    
    return { intelligence, message, loading, error, createIntelligence };
}

export class Intelligence {

    constructor(private data: IntelligenceResultsResponse) {}
    
    getSummary(): string {
        return this.data['assembly_ai.summary'];
    }

    getLanguage(): string {
        return this.data['assembly_ai.language_code'];
    }
}

export default useIntelligence;