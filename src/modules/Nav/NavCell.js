/* @flow */
/* eslint max-len: 0 */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { media } from '../../components/Setting/Setting';

export const LogoCell = styled.div `
  min-width: 120px;
  min-height: 60px;
  background-color: transparent;
  margin: 10px;
  ${media.tablet `
    flex: 1 100%;
    max-width: 80%;
    align-self: flex-start;
    order: ${props => props.order};
    `
  }
  margin-right: auto;
  order: -1000;
`;

const DefaultCell = styled.div `
  min-width: 120px;
  min-height: 60px;
  /*background-color: ${props => props.theme.secondary};*/
  border-radius: 5px;
  color: ${ p => `${p.theme.tertiary || '#777'}` };
  background-image: ${p => `linear-gradient(to right, ${p.theme.secondary}, ${p.theme.main})`};
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
