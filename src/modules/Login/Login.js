/* @flow */
import Inferno, { linkEvent } from 'inferno';
import Component from 'inferno-component';

class Login extends Component {
  submit(instance, event) {
    event.preventDefault();
    const store = instance.context.store;
    const state = store.getState();
    console.log(state);
    store.dispatch({type: 'LOGIN_REACTION'});
  }

  render() {

    return (
      <div>
      <h1>Login</h1>
      <form onSubmit={linkEvent(this, this.submit)}>
      <button type="submit">Log in</button>
      </form>
      </div>
    );
  }
}

export default Login;
