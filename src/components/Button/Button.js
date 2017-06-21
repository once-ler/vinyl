import styled, {css} from 'styled-components';

const Button = styled.button`
  position: relative;
  min-width: 110px;
  max-width: 300px;
  min-height: 40px;
  font-size: 1.3em;
  color: ${props => props.theme.secondary};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  cursor: pointer;
  border-radius: 5px;
  type: ${props => props.type || 'button'};
  transition-duration: 0.4s;
  &:hover {
    font-weight: 900;
    letter-spacing: 1px;
    box-shadow: 5px 10px 5px #888888;
  } 
  ${props => props.gradient &&
    css`
      color: ${props => props.theme.tertiary};
      background-image: linear-gradient(to right, ${props.theme.secondary}, ${props.theme.main});`
  }
  ${props => props.plain &&
    css`
      background: white;
      border: 4px solid ${props => props.theme.secondary};`
  }
  ${props => props.clear &&
    css`
      text-align: left;
      padding: 0 1em;
      margin: 0;
      background: transparent;
      border-style: none;
      border-radius: 0; 
    `
  }
`;

export default Button;
