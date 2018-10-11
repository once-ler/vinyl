/* @flow */
import React from 'react'
import setStatic from 'recompose/setStatic'
import withProps from 'recompose/withProps'
import compose from 'recompose/compose'
import { Row, Column as Col, Grid} from 'react-native-responsive-grid'
import {View, Platform} from 'react-native'
import {CaPatientNameComponents, CaPatient} from './CaPatientTypes'
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
          <ResponsiveRow><Legend>Personal</Legend></ResponsiveRow>
          <ResponsiveRow>
            <FormCell growBasis={3}>
              <View>{locals.inputs.firstName}</View>
            </FormCell>
            <FormCell growBasis={2}>
              <View>{locals.inputs.middleName}</View>
            </FormCell>
            <FormCell growBasis={3}>
              <View>{locals.inputs.lastName}</View>
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
          <Col size={40} smSize={100}>
            <View>{locals.inputs.firstName}</View>
          </Col>
          <Col size={20} smSize={100}>
            <View>{locals.inputs.middleName}</View>
          </Col>
          <Col size={30} smSize={100}>
            <View>{locals.inputs.lastName}</View>
          </Col> 
        </Row>
      </Col>
    </Row>
  </Grid>
  )
}

const enhanceWithStatic = setStatic(
  'navigatorButtons', {
    rightButtons: [doneButton]
  }
)

const enhanceWithProps = withProps(({caPatient}) => {
  const { form: { isLoading } } = caPatient
  
  const p = getPayload()
  p.createDate = new Date(p.createDate);
  p.dateOfBirth = new Date(p.dateOfBirth);
  
  const pa = new CaPatient(p)

  console.log(JSON.stringify(pa))
  

  return {
    classOf: CaPatientNameComponents,
    onSubmit: ({formValues, onCaPatientFormFieldChange, navigator}) => e => {
      onCaPatientFormFieldChange('nameComponents', formValues)
      // Go back to previous page.
      // navigator.pop({animated: true, animationType: 'fade'})
    },
    options: {
      template: flexLayout,
      xauto: 'placeholders',
      fields: {
        firstName: {
          label: 'First Name',
          editable: !isLoading
        },
        middleName: {
          label: 'MI',
          maxLength: 12,
          editable: !isLoading
        },
        lastName: {
          label: 'Last Name',
          editable: !isLoading
        }
      }
    }
  }
})

export default compose(
  // enhanceWithStatic,
  connectFunc,
  enhanceWithProps
)(Form)

// Test
function getPayload() {
  return JSON.parse(`{
    "addresses": [{
        "city": "Lake Buena Vista",
        "country": "",
        "county": "",
        "district": "",
        "email": [{
            "email": "theMainMouse@disney.com",
            "type": "Home"
        }],
        "houseNumber": "",
        "phoneNumbers": [{
            "number": "(407)939-1289",
            "type": "Home"
        }],
        "postalCode": "32830",
        "state": "FL",
        "street": ["123 Main St."],
        "type": ""
    }],
    "aliases": [],
    "careTeam": [],
    "confidentialName": "",
    "createDate": "2018-10-05 19:49:20.324",
    "dateOfBirth": "1928-11-18",
    "emergencyContacts": [],
    "employmentInformation": {
        "employerName": "",
        "occupation": "",
        "phoneNumbers": []
    },
    "ethnicity": ["N"],
    "gender": "M",
    "historicalIds": [],
    "homeDeployment": "",
    "id": "935769",
    "ids": [{
        "id": "935769",
        "type": "MRN"
    }],
    "maritalStatus": "",
    "mrn": "935769",
    "name": "",
    "nameComponents": [{
        "academic": "",
        "firstName": "MICKEY",
        "givenName": "",
        "initials": "",
        "lastName": "MOUSE",
        "lastNameFromSpouse": "",
        "lastNamePrefix": "",
        "middleName": "J",
        "preferredName": "",
        "preferredNameType": "",
        "spouseLastNameFirst": "",
        "spouseLastNamePrefix": "",
        "suffix": "",
        "title": ""
    }],
    "nationalIdentifier": "",
    "race": ["W"],
    "rank": "",
    "status": ""
  }
  `)
}