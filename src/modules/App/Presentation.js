import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router';
import { logout } from '../Login/Action';
import Row from '../../components/Row/Row';
import ResponsiveRow from '../../components/Row/ResponsiveRow';
import Cell from '../../components/Cell/Cell';
import ResponsiveCell from '../../components/Cell/ResponsiveCell';
import Container from '../../components/Container/Container';
import { media } from '../../components/Setting/Setting';
import { NavRow, NavCell, LogoCell, navAction } from '../Nav';
import Modal from '../Modal/Modal'; 
const logoImage = require('../../../static/vinyl.svg');
import { ViewPager, Frame, Track, View } from 'react-view-pager';
import toClass from 'recompose/toClass';
import Progress from "react-progress-2";

const BetterLink = styled(Link) `
  color: sandybrown;
  display: block;
  padding: 0.5em 0;
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.tertiary || '#fefefe'};
`;

const StyledPager = styled(ViewPager)`
margin-right: 10px;
  @media only screen and (min-width: 790px) {
    width: 40%;
  }
`;

const Presentation1 = props => (
  <Container>
    <NavRow wrap end>
      <LogoCell>
      <img src={logoImage}/>
      </LogoCell>
      <NavCell margin>
      <BetterLink to="/">Home</BetterLink>
      </NavCell>
      <NavCell margin>
      <BetterLink to="/protected">Protected</BetterLink>
      </NavCell>
      <NavCell margin>
      <BetterLink to="/form">Form</BetterLink>
      </NavCell>
      <NavCell margin>
      <BetterLink to="/scrollsync">ScrollSync</BetterLink>
      </NavCell>
      <NavCell margin>
      <BetterLink to="/calendar">Calendar</BetterLink>
      </NavCell>
      <NavCell>
      <BetterLink to="/oauth2login">Oauth2</BetterLink>
      </NavCell>
      <NavCell>
      <BetterLink to="/logout" onClick={logout}>Logout</BetterLink>
      </NavCell>
    </NavRow>
    <ResponsiveRow>
      {props.children}
    </ResponsiveRow>
    <Modal></Modal>
  </Container>
);

class Presentation extends Component {
  
  render() {
    const {progress} = this.props;
    return (
      <Container>
        <Progress.Component
          style={{backgroundColor: '#fefefe'}}
        />
        <NavRow>
          <LogoCell>
          <img src={logoImage}/>
          </LogoCell>
          <StyledPager tag="main">
            <Frame className="frame">
              <Track
                ref={c => this.frame = c}
                viewsToShow={2.25}
                align={0}
                className="frame"
              >
                <View>
                <NavCell margin>
                <BetterLink to="/">Home</BetterLink>
                </NavCell>
                </View>
                <View>
                <NavCell>
                <BetterLink to="/suggest">Suggest</BetterLink>
                </NavCell>
                </View>
                <View>
                <NavCell margin>
                <BetterLink to="/protected">Protected</BetterLink>
                </NavCell>
                </View>
                <View>
                <NavCell margin>
                <BetterLink to="/form">Form</BetterLink>
                </NavCell>
                </View>
                <View>
                <NavCell margin>
                <BetterLink to="/scrollsync">ScrollSync</BetterLink>
                </NavCell>
                </View>
                <View>
                <NavCell margin>
                <BetterLink to="/calendar">Calendar</BetterLink>
                </NavCell>
                </View>
                <View>
                <NavCell>
                <BetterLink to="/oauth2login">Oauth2</BetterLink>
                </NavCell>
                </View>
                <View>
                <NavCell>
                <BetterLink to="/logout" onClick={logout}>Logout</BetterLink>
                </NavCell>
                </View>
              </Track>
            </Frame>
          </StyledPager>
        </NavRow>
        <ResponsiveRow>
          {this.props.children}
        </ResponsiveRow>
        <Modal></Modal>
      </Container>
    );
  }
}

export default Presentation;
