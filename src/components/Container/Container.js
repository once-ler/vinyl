/* @flow */
import React from 'react';
import { connect } from 'react-redux';
import styled, { ThemeProvider } from 'styled-components';
import { greenTheme } from '../Theme/Theme';
import ResponsiveRow from '../Row/ResponsiveRow';

const DefaultContainer = styled.div `
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  font-family: ${props => props.fontFamily || props.theme.fontFamily};
  font-size: ${props => props.fontSize || props.theme.fontSize};
  background-color: ${props => props.theme.backgroundColor};
`;

const Container = props => {
  return (
    <ThemeProvider theme={greenTheme}>
      <DefaultContainer {...props}>{props.children}</DefaultContainer>
    </ThemeProvider>
  );
};

export default connect(
  state => ({theme: state.theme})
)(Container);
