import React from 'react'
import {connect} from 'react-redux'
import compose from 'recompose/compose'
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'
import {bindActionCreators} from 'redux'
import * as caPatientActions from './CaPatientAction'
import {CaPatient} from './CaPatientTypes'

import CaPatientNameComponents from './CaPatientNameComponents'
// Web
import Container from '../../components/Container/Container';
import ResponsiveRow from '../../components/Row/ResponsiveRow';

const connectFunc = connect(
  state => ({
    caPatient: state.caPatient    
  }),
  dispatch => bindActionCreators(caPatientActions, dispatch)
)

const enhanceWithLifecycle = lifecycle({
  componentDidMount() {
    this.props.navigator && this.props.navigator.setOnNavigatorEvent(this.props.onNavigatorEvent.bind(this.props))
  }
})

const enhanceWithHandlers = withHandlers({
  onNavigatorEvent:  props => event => {
    console.log('CaPatient', event)
    switch (event.id) {
      case 'didAppear':
        const {navigator, caPatient: {form: { isDirty }}} = props
      
        if (isDirty)
        navigator && navigator.setButtons({rightButtons: [saveButton]})
        else
        navigator && navigator.setButtons({rightButtons: [saveButtonDisabled]})
        
        return
      case 'save':
        // Some epic; if successful, disable button & set isDirty to false
        props.navigator && props.navigator.setButtons({rightButtons: [saveButtonDisabled]})
      default:
        return
    }
  }
})

const Presentation = ({location, navigator, caPatient}) => {
  return (<Container style={{flex:1}}>
    <ResponsiveRow>
      {
        caPatient.form.nameComponents.fields.map((a, _id) =>
          <CaPatientNameComponents passedFields={{...a, _id}} />          
        )
      }
    </ResponsiveRow>
  </Container>)
}

export default compose(
  connectFunc,
  enhanceWithHandlers,
  enhanceWithLifecycle
)(Presentation)
