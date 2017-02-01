/* @flow */
/* eslint no-unused-vars: 0, max-len: 0 */
import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { Link } from 'inferno-router';
import styled from 'styled-components';
import { logout } from '../../modules/auth';
import Row from '../../components/Row/Row';
import ResponsiveRow from '../../components/Row/ResponsiveRow';
import NavRow from '../../components/Row/NavRow';
import Cell from '../../components/Cell/Cell';
import ResponsiveCell from '../../components/Cell/ResponsiveCell';
import NavCell from '../../components/Cell/NavCell';
import Container from '../../components/Container/Container';
import { media } from '../../components/Setting/Setting';
import { makeActive } from './Action';

const BetterLink = styled(Link) `
  color: sandybrown;
  display: block;
  padding: 0.5em 0;
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.main};  
`;

class App extends Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.context.router.push('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.context.router.push('/');
    }
  }

  render() {
    return (
      <Container>
        <NavRow wrap end>
          <NavCell margin>
          <BetterLink to="/" onClick={makeActive(this.context.router.location.pathname)}>Home</BetterLink>
          </NavCell>
          <NavCell margin>
          <BetterLink to="/protected" onClick={makeActive(this.context.router.location.pathname)}>Protected</BetterLink>
          </NavCell>
          <NavCell margin>
          <BetterLink to="/form" onClick={makeActive(this.context.router.location.pathname)}>Form</BetterLink>
          </NavCell>
          <NavCell>
          <BetterLink to="/logout" onclick={logout()}>Logout</BetterLink>
          </NavCell>
        </NavRow>
        <ResponsiveRow>
          {this.props.children}
        </ResponsiveRow>
      </Container>
    );
  }
}

export default connect(
  state => ({ user: state.auth.user }),
  { logout, makeActive }
)(App);
