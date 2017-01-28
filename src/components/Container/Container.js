/* @flow */
import Inferno from 'inferno';
import { connect } from 'inferno-redux';
import styled, { ThemeProvider } from 'styled-components';
import { greenTheme } from '../Theme/Theme';

const DefaultContainer = styled.div `\
  font-family: Georgia, serif;
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
