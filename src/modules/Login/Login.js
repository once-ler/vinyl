/* @flow */
import React from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import toClass from 'recompose/toClass';
import { Form as SimplerForm, Field, Submit } from 'simpler-redux-form';
import {login} from './Middleware';
import CenteredContainer from '../../components/Container/CenteredContainer';
import CenteredCell from '../../components/Cell/CenteredCell';
import FlexGrow from '../../components/FlexGrow/FlexGrow';
import Legend from '../../components/Legend/Legend';
import FormComponent from '../../components/Form/Form';
import ValidatedInput from '../../components/Input/ValidatedInput';
import SubmitButton from '../../components/Button/SubmitButton';
import ResponsiveRow from '../../components/Row/ResponsiveRow';

const mapDispatchToState = dispatch => ({
  dispatch,
  submitAction
});

const connectFunc = connect(
  state => ({ loginError: state.auth.error }),
  mapDispatchToState
);

const submitAction = data => (dispatch, getState) => {
  console.log(data);
  dispatch({ type: 'LOGIN_FORM_CLEAR_ERROR' });
  dispatch({ type: 'LOGIN', data });
};

const validateNotEmpty = input => !input ? 'Required.' : undefined;

const Presentation = props => {
  const { onSubmit, submit, error, loginError } = props;
  return (
    <FlexGrow>
    <CenteredContainer backgroundColor="#fefefe">
      <CenteredCell>
        <FormComponent
          onSubmit={submit(submitAction)}>
          <ResponsiveRow>
          <Legend>Log in</Legend>
          </ResponsiveRow>
          <ResponsiveRow column>
          <Field
            name="username"
            component={ValidatedInput}
            type="text"
            label="Username"
            growBasis={3}
            validate={validateNotEmpty}
            error={loginError === 'User not found' ? loginError : undefined}
            />
          <Field
            name="password"
            component={ValidatedInput}
            type="password"
            label="Password"
            growBasis={3}            
            validate={validateNotEmpty}
            error={loginError === 'Wrong password' ? loginError : undefined}
            />
          </ResponsiveRow>
          <ResponsiveRow middle center>
            <Submit component={ SubmitButton }>Save</Submit>
          </ResponsiveRow>
        </FormComponent>
      </CenteredCell>
    </CenteredContainer>
    </FlexGrow>
  );
};

export default compose(
  connectFunc,
  SimplerForm({id: 'login'})  
)(toClass(Presentation));
