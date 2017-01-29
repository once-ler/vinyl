/* @flow */
/* eslint max-len: 0 */
import Inferno from 'inferno';
import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import styled from 'styled-components';
import { Form as SimplerForm, Field } from 'simpler-redux-form';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import FormComponent from '../../components/Form/Form';
import FormCell from '../../components/Cell/FormCell';
import Row from '../../components/Row/Row';
import Cell from '../../components/Cell/Cell';
import Container from '../../components/Container/Container';
import ResponsiveRow from '../../components/Row/ResponsiveRow';
import ResponsiveCell from '../../components/Cell/ResponsiveCell';
import { media } from '../../components/Setting/Setting';

const submitAction = data => (dispatch, getState) => dispatch({ type: 'SUBMIT_REQUEST', data });

const ValidatedInput = props => {
  const { error, indicateInvalid, label, growBasis, ...rest } = props;
  return (
    <FormCell growBasis={growBasis}>
      <Label>{label}</Label>
      <Input {...rest}></Input>
      { indicateInvalid && <div className="error">{error}</div> }
    </FormCell>
  );
};

const validateFirstName = firstName => !firstName ? 'First name is required.' : undefined;
const validateLastName = lastName => !lastName ? 'Last name is required.' : undefined;
const validatePhone = phone => !phone ? 'Phone number is required.' : undefined;

const Form = props => {
  const { phone, submit, error } = props;

  return (
    <Container>
      <FormComponent
        onSubmit={submit(submitAction)}>
        <Row wrap between>
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
        </Row>
      </FormComponent>
      <h1>{error}</h1>
    </Container>
  );
};

class Form2 extends Component {
  render() {
    const { phone, submit, error } = this.props;

    return (
      <Row>
        <form
          onSubmit={submit(submitAction)}>
          <Field
            name="phone"
            component={ValidatedInput}
            value={phone}
            validate={validatePhone}
            type="tel"
            placeholder="Enter phone number"/>
        </form>
        <h1>{error}</h1>
      </Row>
    );
  }
}

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

const withFormComponent = SimplerForm({id: 'profile'})(connectedComponent);

// withFormComponent.componentDidUpdate = (lastProps, nextProps) => {};

export default withFormComponent;
