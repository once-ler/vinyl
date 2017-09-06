/* @flow */
import React from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import toClass from 'recompose/toClass';
import { Form as SimplerForm, Field, Submit } from 'simpler-redux-form';
import {login, logout} from 'redux-implicit-oauth2';
import { updateOauth2Config } from './Action';
import SubmitButton from '../../components/Button/SubmitButton';
import CenteredContainer from '../../components/Container/CenteredContainer';
import CenteredCell from '../../components/Cell/CenteredCell';
import SlideContainer from '../../components/Container/SlideContainer';
import Legend from '../../components/Legend/Legend';
import FormComponent from '../../components/Form/Form';
import ValidatedInput from '../../components/Input/ValidatedInput';
import ResponsiveRow from '../../components/Row/ResponsiveRow';

const config = {
  url: 'https://localhost:4444/dialog/authorize',
  client: "abc123",
  redirect: window.location.origin,
  scope: "offline_access"
};

const validateNotEmpty = input => !input ? 'Required.' : undefined;

const submitAction = props => data => {
  const {dispatch, login, updateOauth2Config} = props;
  
  const config_ = { ...config, ...data };
  dispatch({ type: 'LOGIN_FORM_CLEAR_ERROR' });
  updateOauth2Config(data);
  login(config_);
};

const Login = props => {
  const { url, client, submit, error, loginError, submitAction, isLoggedIn, login, logout } = props;

  if (isLoggedIn) {
    return <SubmitButton onClick={logout}>Logout</SubmitButton>
  } else {
    return (
      <FormComponent
        onSubmit={ submit(submitAction(props)) }>
        <ResponsiveRow>
        <Legend>Log in</Legend>
        </ResponsiveRow>
        <ResponsiveRow column>
        <Field
          name="url"
          component={ValidatedInput}
          value={url}
          placeholder="https://localhost:4444/dialog/authorize"
          type="text"
          label="Oauth2 Url"
          validate={validateNotEmpty}
          error={loginError === 'Oauth2 Url not found' ? loginError : undefined}
          margin
          />
        <Field
          name="client"
          component={ValidatedInput}
          value={client}
          type="text"
          label="Client Id"
          validate={validateNotEmpty}
          error={loginError === 'Client Id not found' ? loginError : undefined}
          />
        </ResponsiveRow>
        <ResponsiveRow middle center>
          <Submit component={ SubmitButton }>Submit</Submit>
        </ResponsiveRow>        
      </FormComponent>
    );
  }
};

const Presentation = props => (
  <SlideContainer direction="up">
    <CenteredContainer backgroundColor="#fefefe">
      <CenteredCell>
      <div style={{width:'500px', overflow: 'hidden'}}>{JSON.stringify(props.oauth2, null, '  ')}</div>
      </CenteredCell>
      <CenteredCell width="80%" maxWidth="500px">
        <Login {...props} />     
      </CenteredCell>
    </CenteredContainer>
  </SlideContainer>);

const mapDispatchToProps = dispatch => ({
  login: props => login(props)(dispatch),
  logout: () => dispatch(logout()),
  submitAction,
  updateOauth2Config: props => dispatch(updateOauth2Config(props)),
  dispatch
});

const connectFunc = connect(
  state => ({
    oauth2: state.oauth2,
    isLoggedIn: state.oauth2.isLoggedIn,
    loginError: state.auth.error,
    url: state.auth.url,
    client: state.auth.client
  }),
  mapDispatchToProps
);

export default compose(
  connectFunc,
  SimplerForm({id: 'oauth2login'})
)(toClass(Presentation));
