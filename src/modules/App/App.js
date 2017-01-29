/* @flow */
/* eslint no-unused-vars: 0, max-len: 0 */
import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { Link } from 'inferno-router';
import styled from 'styled-components';
import { logout } from '../../modules/auth';
import Row from '../../components/Row/Row';
import Cell from '../../components/Cell/Cell';
import ResponsiveRow from '../../components/Row/ResponsiveRow';
import ResponsiveCell from '../../components/Cell/ResponsiveCell';
import Container from '../../components/Container/Container';
import { media } from '../../components/Setting/Setting';

const BetterLink = styled(Link) `
  color: sandybrown;
  display: block;
  padding: 0.5em 0;
  cursor: pointer;
  text-decoration: none;
  color: ${props => props.theme.main};  
`;

const NavCell = styled(ResponsiveCell) `
  min-width: 120px;
  min-height: 60px;
  background-color: ${props => props.theme.secondary};
  margin: 10px;
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

  handleLogout = (instance, event) => {
    event.preventDefault();
    instance.props.logout();
  }

  render() {
    return (
      <Container>
        <ResponsiveRow wrap end>
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
          <BetterLink to="/logout" onClick={linkEvent(this, this.handleLogout)}>Logout</BetterLink>
          </NavCell>
        </ResponsiveRow>
        <ResponsiveRow>
          {this.props.children}
        </ResponsiveRow>
      </Container>
    );
  }
}

export default connect(
  state => ({ user: state.auth.user }),
  { logout }
)(App);
