import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import ThreeBounce from '../Spinner/ThreeBounce';

const DefaultButton = styled(Button)`
  min-width: 150px;
  max-width: 300px;
  min-height: 50px;
  font-size: 1.3em;
  border-radius: 5px;
  color: ${ p => `${p.theme.tertiary || '#777'}` };
  background-image: ${p => `linear-gradient(to right, ${p.theme.secondary}, ${p.theme.main})`};
`;

const SubmitButton = props => {
  const {busy, children, ...rest} = props;
  return (
    <DefaultButton
      type="submit"
      disabled={busy}
      {...rest}
    >
    { busy && <ThreeBounce /> }
    {children}
    </DefaultButton>
  );
};

export default SubmitButton;
