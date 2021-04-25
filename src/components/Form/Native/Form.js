import React, { useState } from 'react'
import t from 'tcomb-form-native'
import {connect} from 'react-redux'

// import defaultProps from 'recompose/defaultProps'
// import lifecycle from 'recompose/lifecycle'
// import shouldUpdate from 'recompose/shouldUpdate'
// import withState from 'recompose/withState'
// import withHandlers from 'recompose/withHandlers'
// import compose from 'recompose/compose'

import cloneDeep from 'lodash.clonedeep'
import {Text, ScrollView, View, TouchableHighlight, Platform} from 'react-native'
import styles from './Styles'
import {doneButton, doneButtonDisabled} from './Buttons'
// Web
import Container from '../../../components/Container/Container';
import ResponsiveRow from '../../../components/Row/ResponsiveRow';

const {form: {Form}} = t

const stylesheet = cloneDeep(Form.stylesheet)
stylesheet.button.alignSelf = 'flex-end'
stylesheet.button.flex = 0

/*
const enhanceWithFormState = withState('formValues', 'setFormValues', {})

const enhanceWithFormIsValidState = withState('isValid', 'setFormIsValid', false)

// Users must define classOf, onSubmit, passedValues
const enhanceWithShouldUpdate = shouldUpdate((props, nextProps) =>
  !!props.classOf && !!props.onSubmit && !!props.passedValues)

const enhanceWithLifecycle = lifecycle({
  componentDidMount() {
    const {setFormValues, passedFields} = this.props
    setFormValues(passedFields)

    this.props.navigator && this.props.navigator.setOnNavigatorEvent(this.props.onNavigatorEvent.bind(this.props))
  }
})

const enhanceWithDefaultProps = defaultProps({
  classOf: undefined,
  options: {stylesheet},
  styles: styles
})

const enhanceWithHandlers = withHandlers(({onSubmit, onNavigatorEvent}) => {
  let form = null

  return {
    onRef: () => (ref) => (form = ref),
    onChange: ({setFormValues, setFormIsValid, formValues, navigator}) => (nextValue) => {
      let value = form.getValue()
      // dom not capturing form.getValue()
      value = value || nextValue

      // {formValues} is passed from previous screen in native.
      let _id = "0"
      _id = formValues ? formValues._id : _id

      if (value) {
        // Set pseudo id from passedFields.
        setFormValues({...value, _id})
        setFormIsValid(true)
        navigator && navigator.setButtons({rightButtons: [doneButton]})
      } else {
        setFormIsValid(false)
        navigator && navigator.setButtons({rightButtons: [doneButtonDisabled]})
      }
    },
    onSubmit,
    onNavigatorEvent: props => event => {
      switch (event.id) {
        case 'done':
          props.onSubmit(props)(event)
          return props.navigator ? props.navigator.pop({animated: true, animationType: 'fade'}) : undefined
        default:
          return
      }
    }
  }
})

const Presentation = ({
  classOf,
  onRef,
  onChange,
  options,
  styles,
  formValues
}) => {
  const _form = (<Form
    ref={onRef}
    type={classOf}
    options={options}
    value={formValues}
    onChange={onChange}
  />)

  // Late binding.
  return ( 
    Platform.OS === 'web' ?
    (
      <Container style={{flex:1}}>
        <ResponsiveRow>
          {_form}
        </ResponsiveRow>
      </Container>
    )
    :
    (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View style={styles.container}>
      {_form}  
      </View>
      </ScrollView>
    )
  )
}

export default compose(
  enhanceWithShouldUpdate,
  enhanceWithFormState,
  enhanceWithFormIsValidState,
  enhanceWithDefaultProps,
  enhanceWithHandlers,
  enhanceWithLifecycle  
)(Presentation)
*/

const FormComponent = props => {
  // defaultProps
  const classOf = props.classOf
  const options =  {stylesheet}
  const styles =  styles

  // withState
  const [formValues, setFormValues] = useState({})
  const [isValid, setFormIsValid] = useState(false)

  // lifecycle
  useEffect(() => {
    const {setFormValues, passedFields} = props
    setFormValues(passedFields)

    props.navigator && props.navigator.setOnNavigatorEvent(props.onNavigatorEvent.bind(props))
  }, [])

  // withHandlers
  let form = null

  const onRef = () => (ref) => (form = ref)
  
  const onChange = ({setFormValues, setFormIsValid, formValues, navigator}) => (nextValue) => {
    let value = form.getValue()
    // dom not capturing form.getValue()
    value = value || nextValue

    // {formValues} is passed from previous screen in native.
    let _id = "0"
    _id = formValues ? formValues._id : _id

    if (value) {
      // Set pseudo id from passedFields.
      setFormValues({...value, _id})
      setFormIsValid(true)
      navigator && navigator.setButtons({rightButtons: [doneButton]})
    } else {
      setFormIsValid(false)
      navigator && navigator.setButtons({rightButtons: [doneButtonDisabled]})
    }
  }
  
  const onSubmit = props.onSubmit
  
  const onNavigatorEvent = props => event => {
    switch (event.id) {
      case 'done':
        props.onSubmit(props)(event)
        return props.navigator ? props.navigator.pop({animated: true, animationType: 'fade'}) : undefined
      default:
        return
    }
  }

  // Presentation
  const _form = (<Form
    ref={onRef}
    type={classOf}
    options={options}
    value={formValues}
    onChange={onChange}
  />)

  // Late binding.
  return ( 
    Platform.OS === 'web' ?
    (
      <Container style={{flex:1}}>
        <ResponsiveRow>
          {_form}
        </ResponsiveRow>
      </Container>
    )
    :
    (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
      <View style={styles.container}>
      {_form}  
      </View>
      </ScrollView>
    )
  )

}

export default FormComponent
