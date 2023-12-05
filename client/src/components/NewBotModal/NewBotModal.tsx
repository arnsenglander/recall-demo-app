import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import './styles.css';

interface NewBotModalProps {
  open: boolean;
  onOpenChange: () => void;
  onSendBot: () => void;
}

const NewBotModal = ({ open, onOpenChange, onSendBot }: NewBotModalProps) => (
  <Dialog.Root open={open} onOpenChange={onOpenChange}>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">New Bot</Dialog.Title>
        <Dialog.Description className="DialogDescription">
            The bot will join the meeting at the provided URL and automatically transcribe the meeting.
        </Dialog.Description>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="meeting_url">
            Meeting URL
          </label>
          <input className="Input" id="name" placeholder="Zoom, Google Meet, etc." /> 
        </fieldset>
        <fieldset className="Fieldset">
          <label className="Label" htmlFor="name">
            Bot Name
          </label>
          <input className="Input" id="username" placeholder="Transcription Bot" />
        </fieldset>
        <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end', gap: '1rem' }}>
          <Dialog.Close asChild>
            <button className="Button grey">Cancel</button>
            </Dialog.Close>
          <Dialog.Close asChild>
            <button className="Button">Confirm</button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default NewBotModal;