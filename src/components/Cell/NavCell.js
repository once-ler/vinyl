/* @flow */
/* eslint max-len: 0 */
import Inferno from 'inferno';
import { connect } from 'inferno-redux';
import styled from 'styled-components';
import Cell from './Cell';
import { media } from '../Setting/Setting';

const DefaultCell = styled(Cell) `
  min-width: 120px;
  min-height: 60px;
  background-color: ${props => props.theme.secondary};
  margin: 10px;
  ${media.tablet `
    flex: 1 100%;
    max-width: 80%;
    align-self: flex-start;
    order: ${props => props.order};
    `
  }
  order: 0;
`;

const NavCell = props => {
  const { children, routing, ...rest } = props;
  const newProps = {
    ...rest,
    order:
    routing.locationBeforeTransitions &&
    routing.locationBeforeTransitions.pathname === props.children.props.to ? -1 : undefined
  };

  return (
    <DefaultCell {...newProps}>{children}</DefaultCell>
  );
};

export default connect(
  state => ({ routing: state.routing })
)(NavCell);
