import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { logout } from '../../modules/auth';
import Row from '../../components/Row/Row';
import ResponsiveRow from '../../components/Row/ResponsiveRow';
import Cell from '../../components/Cell/Cell';
import ResponsiveCell from '../../components/Cell/ResponsiveCell';
import Container from '../../components/Container/Container';
import { media } from '../../components/Setting/Setting';
import { NavRow, NavCell, navAction } from '../Nav';

const BetterLink = styled(Link) `
  color: sandybrown;
  display: block;
  padding: 0.5em 0;
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.main};
`;

export default props => (
  <Container>
    <NavRow wrap end>
      <NavCell margin>
      <BetterLink to="/">Home</BetterLink>
      </NavCell>
      <NavCell margin>
      <BetterLink to="/protected">Protected</BetterLink>
      </NavCell>
      <NavCell margin>
      <BetterLink to="/form">Form</BetterLink>
      </NavCell>
      <NavCell>
      <BetterLink to="/logout" onclick={logout()}>Logout</BetterLink>
      </NavCell>
    </NavRow>
    <ResponsiveRow>
      {props.children}
    </ResponsiveRow>
  </Container>
);
