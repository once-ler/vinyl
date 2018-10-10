/* @flow */
import React from 'react'
import withProps from 'recompose/withProps'
import compose from 'recompose/compose'
import { Row, Column as Col, Grid} from 'react-native-responsive-grid'
import {View, Platform} from 'react-native'
import {CaPatientIdType} from './CaPatientTypes'
import connectFunc from './ConnectFunc'
import Form from '../../components/Form/Native/Form'
import {doneButton, doneButtonDisabled} from './CaPatientButtons'
// Web
import FormComponent from '../../components/Form/Form'
import Container from '../../components/Container/Container'
import SlideContainer from '../../components/Container/SlideContainer'
import ResponsiveRow from '../../components/Row/ResponsiveRow'
import Legend from '../../components/Legend/Legend'
import FormCell from '../../components/Cell/FormCell'
import ResponsiveCell from '../../components/Cell/ResponsiveCell'

const flexLayout = Platform.OS === 'web' ?
(locals) => {
  return (
    <SlideContainer>      
      <Container backgroundColor="#fefefe">
        <FormComponent>
          <ResponsiveRow><Legend>Patient Id Type</Legend></ResponsiveRow>
          <ResponsiveRow>
            <FormCell growBasis={2}>
              <View>{locals.inputs.type}</View>
            </FormCell>
            <FormCell growBasis={3}>
              <View>{locals.inputs.id}</View>
            </FormCell>
          </ResponsiveRow>
        </FormComponent>
      </Container>
    </SlideContainer>
  )
}
:
(locals) => {
  return (<Grid>
    <Row>
      <Col size={90} offset={6} >
        <Row>
          <Col size={30} smSize={100}>
            <View>{locals.inputs.type}</View>
          </Col>
          <Col size={40} smSize={100}>
            <View>{locals.inputs.id}</View>
          </Col>
        </Row>
      </Col>
    </Row>
  </Grid>
  )
}

const enhanceWithProps = withProps(({caPatient}) => {
  const { form: { isLoading } } = caPatient
  
  return {
    classOf: CaPatientIdType,
    onSubmit: ({formValues, onCaPatientFormFieldChange, navigator}) => e => {
      onCaPatientFormFieldChange('ids', formValues)
      // Go back to previous page.
      // navigator.pop({animated: true, animationType: 'fade'})
    },
    options: {
      template: flexLayout,
      xauto: 'placeholders',
      fields: {
        firstName: {
          label: 'Patient ID Type',
          nullOption: {value: '', text: 'Choose the patient id type'},
          editable: !isLoading
        },
        id: {
          label: 'ID',
          maxLength: 20,
          editable: !isLoading
        }
      }
    }
  }
})

export default compose(
  connectFunc,
  enhanceWithProps
)(Form)
