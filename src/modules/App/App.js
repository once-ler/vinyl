/* eslint no-unused-vars: 0 */
import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { IndexLink, Link } from 'inferno-router';
import { logout } from '../../modules/auth';

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
        <IndexLink to="/">Brand</IndexLink>
          <button key={10} onClick={linkEvent(this, this.handleLogout)}>
            <Link to="/logout">Logout</Link>
          </button>
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
