import { Bot } from "types/bot";
import { prettifyDate } from "@/lib/dates";
import { getPlatformLabel } from "@/lib/platforms";
import Badge from "@/components/Badge/Badge";
import { PersonIcon } from "@radix-ui/react-icons";

const DashboardPageHeader = ({ bot }: { bot: Bot }) => (
  <div className="botViewHeader">
    <div className="botViewHeaderTitle">{getPlatformLabel(bot.meeting_url.platform)} Call</div>
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
      <div>{prettifyDate(bot.join_at)}</div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem' }}>
        {
          bot.meeting_participants.map((participant) => (
            <Badge key={participant.id} label={participant.name} 
              icon={<PersonIcon height={14} width={14} />}
            />
          ))
        }
      </div>
    </div>
  </div>
);

export default DashboardPageHeader;