import { Link } from 'react-router';
import styled from 'styled-components';

const activeClassName = 'nav-item-active';

const BetterLink = styled(Link).attrs({
  activeClassName
}) `
  flex-grow: 1;
  padding: 8px 1rem;
  position: relative;
  text-decoration: none;
  z-index: 100;
  transition-duration: 0.4s;
  color: #fbad50;
  :visited {
    color: #fbad50;
  }
  :hover {
    background-color: #fbad50;
    color: #cd486b;
    box-shadow:         6px 3px 10px 0px rgba(0, 0, 0, 0.4);
  }
  &.${activeClassName} {
    background-image:
    linear-gradient(
      165deg, #fbad50, #bc2a8d
    );
    color: #fefefe;
  }
  /*
  color: sandybrown;
  display: block;
  padding: 0.5em 0;
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.tertiary || '#fefefe'};
  */
`;

export default BetterLink;
