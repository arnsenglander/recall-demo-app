import React from 'react';
import MeetingList from '../MeetingList/MeetingList';
import { CreateBotRequest, Meeting } from '../../types/types';
import './styles.css';
import NewBotModal from '../NewBotModal/NewBotModal';
import { Separator } from '@radix-ui/react-separator';

interface SidebarProps {
  meetings: Meeting[]; // Array of meeting titles
  onSelectMeeting: (meeting: Meeting) => void;
  onSendBot: (bot: CreateBotRequest) => Promise<void>;
}

const Sidebar: React.FC<SidebarProps> = ({ meetings, onSelectMeeting, onSendBot }) => {

  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <aside className="sidebar">
      <div className="sidebarTitle">Meetings</div>
      <Separator className="sidebarSeparator" color="black" />
      <div className="sidebarList">
        <MeetingList meetings={meetings} onSelectMeeting={onSelectMeeting} /> 
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
