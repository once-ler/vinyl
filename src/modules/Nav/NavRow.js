/* @flow */
/* eslint max-len: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import Row from '../../components/Row/Row';
import NavIcon from '../../components/Icon/NavIcon';
import { media } from '../../components/Setting/Setting';
import { toggle } from './Action';

const DefaultRow = styled(Row) `
height: 100%;
margin: 0;
background-repeat: no-repeat;
background-attachment: fixed;
background-image:
  linear-gradient(
    165deg, #bc2a8d, #e95950, #fccc63
  );
margin-bottom: 10px;
box-shadow: 0 8px 6px -6px #777;
overflow: hidden;
${media.tablet `
  height: ${props => props.nav && props.nav.collapse ? '65px' : '100%'};
  overflow: hidden;
  justify-content: flex-start;    
`}
`;

const DefaultRow1 = styled(Row) `
  background-color: ${props => props.theme.tertiary};
  margin-bottom: 10px;
  box-shadow: 0 8px 6px -6px #777;
  overflow: hidden;
`;

// dispatch() passed from parent App.
const NavRow = props => {
  const { children, dispatch, ...rest } = props;
  return (
    <DefaultRow {...rest}>
    {children}
    <NavIcon onClick={e => dispatch(toggle())}/>
    </DefaultRow>
  );
};

const NavRow1 = props => {
  const { children, dispatch, ...rest } = props;
  return (
    <DefaultRow {...rest}>
    {children}
    </DefaultRow>
  );
};

export default connect(
  state => ({ nav: state.nav })
)(NavRow);
