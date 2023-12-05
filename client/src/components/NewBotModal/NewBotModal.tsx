import * as Dialog from '@radix-ui/react-dialog';
import './styles.css';

interface NewBotModalProps {
  open: boolean;
  onOpenChange: () => void;
  onSendBot: () => void;
}

const NewBotModal = ({ open, onOpenChange, onSendBot }: NewBotModalProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Overlay className="overlay" />
    <Dialog.Content className="content">
      <div className="title">Send Bot to Meeting</div>
      <div className="description">
        The bot will join the meeting at the provided URL.
        A transcription and action items will be generated automatically.
      </div>
      <Dialog.Close className="close" />
      <div className="buttons">
        <button className="cancel" onClick={onOpenChange}>Cancel</button>
        <button className="send" onClick={onSendBot}>Confirm</button>
      </div>
    </Dialog.Content>
  </Dialog.Root>
);

export default NewBotModal;