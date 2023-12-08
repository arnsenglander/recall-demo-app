import { useState, useEffect } from 'react';
import { IntelligenceResultsResponse, SentimentAnalysisResult } from 'types/intelligence';

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

        try {
            const response = await fetch(`/api/bots/${botId}/intelligence`);
            // If it's a 404, no intelligence exists yet. 
            if (response.status === 404) {
                return;
            }

            const data = await response.json() as { intelligence: IntelligenceResultsResponse };
            if (!data.intelligence) {
                setError('No intelligence data found');
                return;
            }

            // If an empty object is returned, it exists but is still being generated.
            if (Object.keys(data.intelligence).length === 0) {
                setMessage('Generating summary...');
                return;
            }

            setIntelligence(new Intelligence(data.intelligence));
        } catch (error) {
            console.error(error)
            setError('Error fetching intelligence');
        } finally {
            setLoading(false);
        }
    };
 
    /**
     * Start running analysis on the bot's transcript.
     * Right now this defaults to AssemblyAI's summarization, sentiment analysis, 
     * and entity detection.
     *
     * This can easily be extended to allow the end user to choose which AI provider
     * and what kind of analysis they want to run.
     * 
     * More info: https://recallai.readme.io/reference/bot_analyze_create
     * @param botId 
     * @returns 
     */
    const createIntelligence = async (botId: string) => {
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
    getSentimentResults(): SentimentAnalysisResult[] {
        return this.data['assembly_ai.sentiment_analysis_results'] || [];
    }
}

export default useIntelligence;