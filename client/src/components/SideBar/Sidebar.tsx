import React from 'react';
import MeetingList from '../MeetingList/MeetingList';
import { Meeting } from '../../types/meeting';
import './styles.css';

interface SidebarProps {
  meetings: Meeting[]; // Array of meeting titles
  onSelectMeeting: (meeting: Meeting) => void;
  onSendBot: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ meetings, onSelectMeeting, onSendBot }) => {
  return (
    <aside className="sidebar">
      <div className="sidebarTitle">Meetings</div>
      <div className="sidebarList">
        <MeetingList meetings={meetings} onSelectMeeting={onSelectMeeting} /> 
      </div>
      <button className="newMeetingButton" onClick={onSendBot}>New Meeting</button>
    </aside>
  );
};

export default Sidebar;
