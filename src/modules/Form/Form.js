/* @flow */
/* eslint max-len: 0 */
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Form as SimplerForm, Field, Submit } from 'simpler-redux-form';
import Input from '../../components/Input/Input';
import ValidatedInput from '../../components/Input/ValidatedInput';
import SubmitButton from '../../components/Button/SubmitButton';
import Label from '../../components/Label/Label';
import Fieldset from '../../components/Fieldset/Fieldset';
import Legend from '../../components/Legend/Legend';
import FormComponent from '../../components/Form/Form';
import FormCell from '../../components/Cell/FormCell';
import Row from '../../components/Row/Row';
import Cell from '../../components/Cell/Cell';
import Container from '../../components/Container/Container';
import ResponsiveRow from '../../components/Row/ResponsiveRow';
import ResponsiveCell from '../../components/Cell/ResponsiveCell';
import { media } from '../../components/Setting/Setting';
import FlexGrow from '../../components/FlexGrow/FlexGrow';

const submitAction = data => (dispatch, getState) => dispatch({ type: 'SUBMIT_REQUEST', data });

const validateFirstName = firstName => !firstName ? 'First name is required.' : undefined;
const validateLastName = lastName => !lastName ? 'Last name is required.' : undefined;
const validatePhone = phone => !phone ? 'Phone number is required.' : undefined;

const Form = props => {
  const { phone, submit, error } = props;

  return (
    <FlexGrow>      
    <Container>
      <FormComponent
        onSubmit={submit(submitAction)}>
        <ResponsiveRow><Legend>Personal</Legend></ResponsiveRow>
        <ResponsiveRow>
        <Field
          name="firstName"
          component={ValidatedInput}
          validate={validateFirstName}
          type="text"
          label="First Name"
          growBasis={3}
          placeholder="Enter first name"/>
        <Field
          name="lastName"
          component={ValidatedInput}
          validate={validateLastName}
          type="text"
          label="Last Name"
          growBasis={3}
          placeholder="Enter last name"/>
        <Field
          name="phone"
          component={ValidatedInput}
          value={phone}
          validate={validatePhone}
          type="tel"
          label="Phone Number"
          growBasis={2}
          placeholder="Enter phone number"/>
        </ResponsiveRow>
        <ResponsiveRow>
        <Field
          name="homeAddress"
          component={ValidatedInput}
          type="text"
          label="Home Address"
          growBasis={4}
          placeholder="Enter home address"/>
        <Field
          name="homeState"
          component={ValidatedInput}
          type="text"
          label="Home State"
          growBasis={1}
          placeholder="Enter home state"/>
        <Field
          name="homeZip"
          component={ValidatedInput}
          type="text"
          label="Home Zip"
          growBasis={2}
          placeholder="Enter home zip"/>
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
