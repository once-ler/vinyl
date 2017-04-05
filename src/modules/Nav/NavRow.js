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
  ${media.tablet `
    height: ${props => props.nav && props.nav.collapse ? '65px' : '100%'};
    overflow: hidden;
    justify-content: flex-start;    
  `}
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

export default connect(
  state => ({ nav: state.nav })
)(NavRow);
