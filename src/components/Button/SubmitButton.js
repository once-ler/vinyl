import Inferno from 'inferno';
import Button from './Button';

const SubmitButton = ({busy, children}) => (
  <Button
    type="submit"
    disabled={busy}
  >{children}
  </Button>
);

export default SubmitButton;
