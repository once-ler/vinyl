import styled from 'styled-components';

const Button = styled.button`
  background: white;
  color: ${props => props.theme.secondary};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 4px solid ${props => props.theme.secondary};
  border-radius: 3px;
  cursor: pointer;
  max-width: 250px;
  type: ${props => props.type || 'button'};
`;

export default Button;
