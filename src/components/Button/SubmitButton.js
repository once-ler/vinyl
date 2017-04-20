import React from 'react';
import Button from './Button';
import ThreeBounce from '../Spinner/ThreeBounce';

const SubmitButton = props => {
  const {busy, children, ...rest} = props;
  return (
    <Button
      type="submit"
      disabled={busy}
      {...rest}
    >
    { busy && <ThreeBounce /> }
    {children}
    </Button>
  );
};

export default SubmitButton;
