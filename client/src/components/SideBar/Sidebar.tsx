import React from 'react';
import BotList from '../BotsList/BotsList';
import { Bot } from '../../../../types';
import { CreateBotRequest } from '../../../../types';
import './styles.css';
import NewBotModal from '../NewBotModal/NewBotModal';
import { Separator } from '@radix-ui/react-separator';

interface SidebarProps {
  bots: Bot[];
  onSelectedBot: (bot: Bot) => void;
  onSendBot: (bot: CreateBotRequest) => Promise<void>;
}

const Sidebar: React.FC<SidebarProps> = ({ bots, onSelectedBot, onSendBot }) => {

  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebarTitle">Bot Transcripts</div>
      <Separator className="sidebarSeparator" color="black" />
      <div className="sidebarList">
        <BotList bots={bots} onSelectBot={onSelectedBot} />
      </div>
      <button 
        className="newMeetingButton" 
        onClick={() => setModalOpen(true)}
      >New Bot</button>
      
      <NewBotModal 
        open={modalOpen} onOpenChange={() => setModalOpen(!modalOpen)} 
        onSendBot={onSendBot} 
      />
    </aside>
  );
};

export default Sidebar;
