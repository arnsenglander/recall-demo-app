import React from 'react';
import BotList from '../../features/bots/BotsList/BotsList';
import { Bot } from '../../../../types';
import { CreateBotRequest } from '../../../../types';
import NewBotModal from '../../features/bots/NewBotModal/NewBotModal';
import './styles.css';

interface DashboardSidebarProps {
  bots: Bot[];
  onSelectedBot: (bot: Bot) => void;
  onSendBot: (bot: CreateBotRequest) => Promise<void>;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ bots, onSelectedBot, onSendBot }) => {

  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebarTitle">Bot Transcripts</div>
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
