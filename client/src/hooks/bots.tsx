
import { useState, useEffect } from 'react';
import { Bot, ListBotsResponse } from './../../../types';

export interface BotsHook {
    bots: Bot[];
    loading: boolean;
    error: string | null;
}

const useBots = (): BotsHook => {
    const [bots, setBots] = useState<Bot[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBots = async () => {
            try {
                const response = await fetch('/api/bots');
                const data = await response.json() as ListBotsResponse;
                setBots(data.bots.results);
            } catch (error) {
                console.error(`Error fetching bots: ${error}`);
                setError('Error fetching bots');
            } finally {
                setLoading(false);
            }
        };

        fetchBots();
    }, []);

    return { bots, loading, error };
}

export default useBots;
