import React from 'react';
import Button from './Button';
import ThreeBounce from '../Spinner/ThreeBounce';

const SubmitButton = ({busy, children}) => (
  <Button
    type="submit"
    disabled={busy}
  >
  { busy && <ThreeBounce /> }
  {children}
  </Button>
);

export default SubmitButton;
