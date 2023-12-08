import { useState } from 'react';
import { Bot, CreateBotRequest } from 'types/bot';
import BotList from '@/features/bots/BotsList/BotsList';
import NewBotModal from '@/features/bots/NewBotModal/NewBotModal';
import './styles.css';

interface DashboardSidebarProps {
  bots: Bot[];
  onSelectedBot: (bot: Bot) => void;
  onSendBot: (bot: CreateBotRequest) => Promise<void>;
}

const DashboardSidebar = ({ bots, onSelectedBot, onSendBot }: DashboardSidebarProps) => {

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebarTitle">Bot Transcripts</div>
      <div className="sidebarSeparator" />
      <div className="sidebarList">
        <BotList bots={bots} onSelectBot={onSelectedBot} />
      </div>
      <button className="newMeetingButton" onClick={() => setModalOpen(true)}>New Bot</button>
      <NewBotModal 
        open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)} 
        onSendBot={onSendBot} 
      />
    </aside>
  );
};

export default DashboardSidebar;
