import styled from 'styled-components';
import scrollbarSize from 'dom-helpers/util/scrollbarSize'

export default styled.div`
  height: ${props => props.height};
  width: ${props => props.width - scrollbarSize()};
`;
