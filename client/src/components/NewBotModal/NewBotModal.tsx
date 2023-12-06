import * as Dialog from '@radix-ui/react-dialog';
import { CreateBotRequest } from '../../types/types';
import './styles.css';

interface NewBotModalProps {
  open: boolean;
  onOpenChange: () => void;
  onSendBot: (data: CreateBotRequest) => Promise<void>;
}

const NewBotModal = ({ open, onOpenChange, onSendBot }: NewBotModalProps) => {

  const onConfirm = () => {
    onSendBot({ 
      meeting_url: (document.getElementById('meeting_url') as HTMLInputElement).value,
      name: (document.getElementById('name') as HTMLInputElement).value,
     }).then(() => {
      onOpenChange();
      // reset input values
      (document.getElementById('meeting_url') as HTMLInputElement).value = '';
      (document.getElementById('name') as HTMLInputElement).value = '';
    });
  };

  return (
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
            <input className="Input" id="meeting_url" placeholder="Zoom, Google Meet, etc." /> 
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="name">
              Bot Name
            </label>
            <input className="Input" id="name" placeholder="Transcription Bot" />
          </fieldset>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end', gap: '1rem' }}>
            <Dialog.Close asChild>
              <button className="Button grey">Cancel</button>
              </Dialog.Close>
            <Dialog.Close asChild>
              <button className="Button" onClick={onConfirm}
              >Confirm</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default NewBotModal;