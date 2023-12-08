import { Bot } from "types/bot";
import { prettifyDate } from "@/lib/dates";
import { getPlatformLabel } from "@/lib/platforms";
import Badge from "@/components/Badge/Badge";
import { DownloadIcon, PersonIcon } from "@radix-ui/react-icons";
import './header.css';

const DashboardPageHeader = ({ bot }: { bot: Bot }) => {

  const mediaHasExpired = () => {
    const now = new Date();
    const expirationDate = new Date(bot.media_retention_end);
    return now.getTime() > expirationDate.getTime();
  }

  return (
    <div className="botViewHeader">
      <div className="botViewHeaderTitle">{getPlatformLabel(bot.meeting_url.platform)} Call</div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <div>{prettifyDate(bot.join_at)}</div>
        <div className="participantsBadgeContainer">
          {
            bot.meeting_participants.map((participant) => (
              <Badge key={participant.id} label={participant.name} 
                icon={<PersonIcon height={14} width={14} />}
              />
            ))
          }
        </div>
          {!mediaHasExpired() && <VideoDownloadButton url={bot.video_url} /> }
      </div>
    </div>
  );
}

const VideoDownloadButton = ({ url }: { url: string }) => (
  <button className="downloadButton" onClick={() => window.open(url, '_blank')}>
    <DownloadIcon height={14} width={14} className="downloadButtonIcon" />
    Download Video
  </button>
);

export default DashboardPageHeader;