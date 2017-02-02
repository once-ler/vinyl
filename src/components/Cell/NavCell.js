import Inferno from 'inferno';
import { connect } from 'inferno-redux';
import styled from 'styled-components';
import ResponsiveCell from './ResponsiveCell';

const NavCell = styled(ResponsiveCell) `
  min-width: 120px;
  min-height: 60px;
  background-color: ${props => props.theme.secondary};
  margin: 10px;
  order: ${props => props.active === props.children.props.to ? -1 : undefined};
`;

// console.log(<NavCell />);
this.context.store.getState().routing.locationBeforeTransitions.pathname

export default connect(
  state => ({ active: state.nav.active })
)(NavCell);
