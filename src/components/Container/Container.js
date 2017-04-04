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
  font-family: ${props => props.theme.fontFamily};
  background-color: ${props => props.theme.backgroundColor};
`;

const Container = props => {
  return (
    <ThemeProvider theme={greenTheme}>
      <DefaultContainer>{props.children}</DefaultContainer>
    </ThemeProvider>
  );
};

export default connect(
  state => ({theme: state.theme})
)(Container);
