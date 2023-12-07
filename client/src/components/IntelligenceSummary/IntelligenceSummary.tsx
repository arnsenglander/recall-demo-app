import useIntelligence from "../../hooks/intelligence";
import { Bot } from "../../../../types";
import { MagicWandIcon } from "@radix-ui/react-icons";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const LoadingState = () => <div className="intelligenceLoading">Loading...</div>;

const MessageSection = ({ message }: { message: string }) => (
  <div className="intelligenceLoading">{message}</div>
);

const IntelligenceBody = ({ intelligence }: { intelligence: any }) => {
  return (
    <div className="intelligenceBody">
      {intelligence && <div className="intelligenceSummary">{intelligence?.getSummary()}</div>}
    </div>
  );
};

const CreateButton = ({ onClick }: { onClick: () => void }) => (
  <button className="intelligenceCreateButton" onClick={onClick}>
    <MagicWandIcon className="intelligenceCreateButtonIcon" />
    <div>Generate</div>
  </button>
);

const IntelligenceSummary = ({ bot }: { bot: Bot }) => {
  const { intelligence, message, loading, error, createIntelligence } = useIntelligence(bot.id);

  return (
    <ErrorBoundary >
      <div className="intelligenceContainer">
        <div className="intelligenceTitle">Summary</div>
        { loading && <LoadingState />}
        { message && <MessageSection message={message} />}
        <IntelligenceBody intelligence={intelligence} />

        <div className="intelligenceBody">
          {!intelligence && !loading && !error && !message && (
            <CreateButton onClick={() => createIntelligence(bot.id)} />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default IntelligenceSummary;