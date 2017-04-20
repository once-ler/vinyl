/* @flow */
import React from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import toClass from 'recompose/toClass';
import { Form as SimplerForm, Field, Submit } from 'simpler-redux-form';
import {login, logout} from 'redux-implicit-oauth2';
import SubmitButton from '../../components/Button/SubmitButton';
import CenteredContainer from '../../components/Container/CenteredContainer';
import CenteredCell from '../../components/Cell/CenteredCell';
import FlexGrow from '../../components/FlexGrow/FlexGrow';
import Legend from '../../components/Legend/Legend';
import FormComponent from '../../components/Form/Form';
import ValidatedInput from '../../components/Input/ValidatedInput';
import ResponsiveRow from '../../components/Row/ResponsiveRow';

const provider = 'https://localhost:4444';

let config = {
  url: `${provider}/dialog/authorize`,
  client: "abc123",
  redirect: 'http://localhost:3000',
  scope: "offline_access"
};

const validateNotEmpty = input => !input ? 'Required.' : undefined;

const Login = ({ isLoggedIn, login, logout, clientId }) => {
  console.log(clientId)
  if (isLoggedIn) {
    return <SubmitButton onClick={logout}>Logout</SubmitButton>
  } else {
    return <SubmitButton onClick={login}>Login</SubmitButton>
  }
};

const Presentation = props => (
  <FlexGrow>
    <CenteredContainer backgroundColor="#fefefe">
      <CenteredCell>
      <div style={{width:'200px', overflow: 'hidden'}}>{JSON.stringify(props.oauth2, null, '  ')}</div>
      <FormComponent
        onSubmit={e => e.preventDefault()}>
        <ResponsiveRow>
        <Legend>Log in</Legend>
        </ResponsiveRow>
        <ResponsiveRow column>
        <Field
          name="clientId"
          component={ValidatedInput}
          type="text"
          label="Client Id"
          growBasis={5}
          validate={validateNotEmpty}
          error={props.loginError === 'Client Id not found' ? loginError : undefined}
          />
        </ResponsiveRow>

        <ResponsiveRow middle center>
          <Login {...props} />
        </ResponsiveRow>
      </FormComponent>      
      </CenteredCell>
    </CenteredContainer>
  </FlexGrow>
);

const mapDispatchToProps = dispatch => ({
  login: () => login(config)(dispatch),
  logout: () => dispatch(logout()),
  dispatch
});

const connectFunc = connect(
  state => ({
    oauth2: state.oauth2,
    isLoggedIn: state.oauth2.isLoggedIn,
    loginError: state.auth.error,
    clientId: state.auth.clientId
  }),
  mapDispatchToProps
);

export default compose(
  connectFunc,
  SimplerForm({id: 'oauth2login'})
)(toClass(Presentation));
