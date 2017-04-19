/* @flow */
/* eslint max-len: 0 */
import React from 'react';
import { connect } from 'react-redux';
import { Form as SimplerForm, Field, Submit } from 'simpler-redux-form';
import ValidatedInput from '../../components/Input/ValidatedInput';
import BorderedValidatedInput from '../../components/Input/BorderedValidatedInput';
import SubmitButton from '../../components/Button/SubmitButton';
import Legend from '../../components/Legend/Legend';
import FormComponent from '../../components/Form/Form';
import Container from '../../components/Container/Container';
import ResponsiveRow from '../../components/Row/ResponsiveRow';
import FlexGrow from '../../components/FlexGrow/FlexGrow';

const submitAction = data => (dispatch, getState) => dispatch({ type: 'SUBMIT_REQUEST', data });

const validateFirstName = firstName => !firstName ? 'First name is required.' : undefined;
const validateLastName = lastName => !lastName ? 'Last name is required.' : undefined;
const validatePhone = phone => !phone ? 'Phone number is required.' : undefined;

const Form = props => {
  const { firstName, lastName, phone, homeAddress, homeState, homeZip, submit, error } = props;

  return (
    <FlexGrow>      
      <Container backgroundColor="#fefefe">
        <FormComponent
          onSubmit={submit(submitAction)}>
          <ResponsiveRow><Legend>Personal</Legend></ResponsiveRow>
          <ResponsiveRow>
          <Field
            name="firstName"
            component={BorderedValidatedInput}
            value={firstName}
            type="text"
            label="First Name"
            growBasis={3}
            required={true}
            />
          <Field
            name="lastName"
            component={BorderedValidatedInput}
            value={lastName}
            validate={validateLastName}
            type="text"
            label="Last Name"
            growBasis={3}
            required={true}
            />
          <Field
            name="phone"
            component={ValidatedInput}
            value={phone}
            validate={validatePhone}
            type="tel"
            label="Phone Number"
            required={true}
            growBasis={2}
            />
          </ResponsiveRow>
          <ResponsiveRow>
          <Field
            name="homeAddress"
            component={BorderedValidatedInput}
            value={homeAddress}
            type="text"
            label="Home Address"
            growBasis={4}
            />
          <Field
            name="homeState"
            component={BorderedValidatedInput}
            value={homeState}
            type="text"
            label="Home State"
            growBasis={1}
            />
          <Field
            name="homeZip"
            component={ValidatedInput}
            value={homeZip}
            type="text"
            label="Home Zip"
            growBasis={2}
            />
          </ResponsiveRow>
          <ResponsiveRow middle center>
          <Submit component={ SubmitButton }>Save</Submit>
          </ResponsiveRow>
        </FormComponent>
        <h1>{error}</h1>      
      </Container>
    </FlexGrow>
  );
};

const connectedComponent = connect(
  state => ({
    firstName: state.profile.user.firstName,
    middleName: state.profile.user.middleName,
    lastName: state.profile.user.lastName,
    phone: state.profile.user.phone,
    gender: state.profile.user.gender,
    homeAddress: state.profile.user.homeAddress,
    homeState: state.profile.user.homeState,
    homeZip: state.profile.user.homeZip
  }),
  { submitAction }
)(Form);

export default SimplerForm({id: 'profile'})(connectedComponent);
