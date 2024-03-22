import { Transcription } from "@/lib/transcribe";
import * as Tabs from "@radix-ui/react-tabs";
import { Bot } from "types/bot";
import SentimentAnalysisView from "@/features/intelligence/SentimentContainer/SentimentContainer";
import useIntelligence from "@/hooks/intelligence";
import TranscriptContainer from "@/features/intelligence/TranscriptContainer/TranscriptContainer";
import { useEffect, useState } from "react";
import useBots from "@/hooks/bots";
import useTranscript from "@/hooks/transcript";
import DashboardPageHeader from "./Header";
import { FileTextIcon } from "@radix-ui/react-icons";
import DashboardSidebar from "./Sidebar";
import "./styles.css";

const DashboardPage = () => {
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  const { bots, loading: botsLoading, handleCreateBot } = useBots();
  const {
    transcript,
    loading: transcriptLoading,
    fetchTranscript,
  } = useTranscript();

  useEffect(() => {
    if (selectedBot) {
      fetchTranscript(selectedBot.id);
    }
    
  }, [selectedBot]);

  const handleSelectedBot = (bot: Bot) => setSelectedBot(bot);

  const loading = botsLoading || transcriptLoading;

  if (loading) return <p>Loading...</p>;

  return (
    <div className="root">
      <DashboardSidebar
        bots={bots}
        onSelectedBot={handleSelectedBot}
        onSendBot={handleCreateBot}
      />
      {/* <div className="content">
        <DashboardMainContent
          selected={selectedBot}
          bots={bots}
          transcript={transcript}
        />
      </div> */}
      
    </div>
  );
};

interface DashboardMainContentProps {
  selected: Bot | null;
  bots: Bot[];
  transcript: Transcription | null;
}

const DashboardMainContent = ({
  selected,
  bots,
  transcript,
}: DashboardMainContentProps) => {
  if (!bots.length || !selected) {
    return (
      <WelcomeMessage
        message={
          bots.length === 0
            ? "Create your first bot to get started."
            : "Select a bot to view the transcript and meeting data."
        }
      />
    );
  }

  if (!transcript) {
    return <div className="botView"> Loading... </div>;
  }

  return (
    <div className="botView">
      <DashboardPageHeader bot={selected} />
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Tabs.List className="TabsList" aria-label="Explore Transcript Data">
          <Tabs.Trigger className="TabsTrigger" value="tab1">
            Transcript
          </Tabs.Trigger>
          <Tabs.Trigger className="TabsTrigger" value="tab2">
            Sentiment
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
          <TranscriptContainer bot={selected} transcript={transcript} />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          <SentimentTabContent bot={selected} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

const SentimentTabContent = ({ bot }: { bot: Bot }) => {
  const { intelligence, loading } = useIntelligence(bot.id);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flex: 1 }}>
        {intelligence ? (
          <SentimentAnalysisView intelligence={intelligence} />
        ) : loading ? (
          <div>Loading...</div>
        ) : (
          <div>No sentiment analysis results available.</div>
        )}
      </div>
    </div>
  );
};

const WelcomeMessage = ({ message }: { message: string }) => (
  <div className="welcome">
    <FileTextIcon height={32} width={32} />
    <p>{message}</p>
  </div>
);

export default DashboardPage;
