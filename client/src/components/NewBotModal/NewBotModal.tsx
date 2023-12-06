import * as Dialog from '@radix-ui/react-dialog';
import { CreateBotRequest } from '../../../../types';
import './styles.css';
import { 
  Root as FormRoot,
  FormLabel,
  FormField,
  FormControl,
  FormMessage,
  FormSubmit,
} from '@radix-ui/react-form';

interface NewBotModalProps {
  open: boolean;
  onOpenChange: () => void;
  onSendBot: (data: CreateBotRequest) => Promise<void>;
}

const NewBotModal = ({ open, onOpenChange, onSendBot }: NewBotModalProps) => {

  const validateLink = (value: string) => !value.match(/https:\/\//);
  const validateName = (value: string) => value.length < 3;

  const onConfirm = async (e: any) => {
    if (validateLink((document.getElementById('meeting_url') as HTMLInputElement).value) || validateName((document.getElementById('name') as HTMLInputElement).value)) {
      return;
    }
    
    onSendBot({ 
      meeting_url: (document.getElementById('meeting_url') as HTMLInputElement).value,
      name: (document.getElementById('name') as HTMLInputElement).value,
     }).then(() => {
      onOpenChange();
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
          <FormRoot>
            <FormField className="FormField" name="meeting_url">
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <FormLabel className="FormLabel">Meeting Link</FormLabel>
                <FormControl asChild>
                  <input className="Input" id="meeting_url" placeholder="https://zoom.us/j/123456789" />
                </FormControl>
              </div>
              <FormMessage className="FormMessage" match={(value) => validateLink(value)}>
                Please provide a valid meeting link
              </FormMessage>
            </FormField>
            <FormField className="FormField" name="name">
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <FormLabel className="FormLabel">Bot Name</FormLabel>
                <FormControl asChild>
                  <input className="Input" id="name" placeholder="Transcription Bot" />
                </FormControl>
              </div>
              <FormMessage className="FormMessage" match="valueMissing"></FormMessage>
              <FormMessage className="FormMessage" match={(value) => validateName(value)}>
                Bot name must be at least 3 characters long.
              </FormMessage>
            </FormField>
          </FormRoot>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end', gap: '1rem' }}>
            <Dialog.Close asChild>
              <button className="Button grey">Cancel</button>
            </Dialog.Close>
            <FormSubmit asChild>
              <button className="Button" onClick={onConfirm}>Confirm</button>
            </FormSubmit>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default NewBotModal;