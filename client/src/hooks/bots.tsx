import { useState, useEffect } from "react";
import { Bot, CreateBotRequest, ListBotsResponse } from "types/bot";

export interface BotsHook {
  bots: Bot[];
  loading: boolean;
  error: string | null;
  handleCreateBot: (bot: CreateBotRequest) => Promise<void>;
}

const useBots = (): BotsHook => {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchBots() {
    console.log("fetchBots");
    setLoading(true);
    try {
      const response = await fetch("/api/bots");
      const data = (await response.json()) as ListBotsResponse;
      console.log("data :", data);
      setBots(data.bots.results);
    } catch (error) {
      console.error(`Error fetching bots: ${error}`);
      setError("Error fetching bots");
    } finally {
      setLoading(false);
    }
  }

  async function create(data: CreateBotRequest): Promise<void> {
    setLoading(true);
    try {
      const response = await fetch("/api/bots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await response.json();
    } catch (error) {
      console.error(`Error creating bot: ${error}`);
      setError("Error creating bot");
    } finally {
      setLoading(false);
    }
  }

  const handleCreateBot = async (bot: CreateBotRequest) => {
    await create(bot).then(() => fetchBots());
  };

  useEffect(() => {
    fetchBots();
  }, []);

  return { bots, loading, error, handleCreateBot };
};

export default useBots;
