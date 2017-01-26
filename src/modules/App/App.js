/* @flow */
/* eslint no-unused-vars: 0 */
import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { Link } from 'inferno-router';
import styled from 'styled-components';
import { logout } from '../../modules/auth';

const BetterLink = styled(Link) `
  color: sandybrown;
  display: block;
  padding: 0.5em 0;
  cursor: pointer;
  text-decoration: none;
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
      <div>
        <BetterLink to="/">Brand</BetterLink>
        <BetterLink to="/protected">Protected</BetterLink>
        <BetterLink to="/logout" onClick={linkEvent(this, this.handleLogout)}>Logout</BetterLink>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ user: state.auth.user }),
  { logout }
)(App);
