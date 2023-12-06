import * as ScrollArea from '@radix-ui/react-scroll-area';
import './styles.css';
import { Bot } from '../../../../types';
import { CalendarIcon } from '@radix-ui/react-icons';


interface BotListProps {
    bots: Bot[];
    onSelectBot: (bot: Bot) => void;
}

const BotList = ({ bots, onSelectBot }: BotListProps) => {

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
  }

  return (
  <ScrollArea.Root className="ScrollAreaRoot">
    <ScrollArea.Viewport className="ScrollAreaViewport">
      {bots.map((bot, index) => (
        <div
          key={index}
          className="botItem"
          onClick={() => {
            onSelectBot(bot);
          }}
        >
          <CalendarIcon height={12} width={20} style={{ marginRight: 5 }} />
          <div>{formatDateString(bot.join_at)}</div>
        </div>
      ))}
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="ScrollAreaCorner" />
  </ScrollArea.Root>
  );
};

export default BotList;
