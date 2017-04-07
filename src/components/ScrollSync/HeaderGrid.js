import styled from 'styled-components';
import { Grid } from 'react-virtualized';

export default styled(Grid)`
  background-color: ${props => props.backgroundColor || '#fefefe'};
  width: 100%;
  border-right: 3px solid #dcdcdc;
  overflow: hidden !important;
`;
