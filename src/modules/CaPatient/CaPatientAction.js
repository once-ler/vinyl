/* @flow */
// import initialState from './CaPatientInitialState'
import initialState from './CaPatientInitialState'

export const ON_CA_PATIENT_FORM_FIELD_CHANGE = 'ON_CA_PATIENT_FORM_FIELD_CHANGE'
export const FETCH_CA_PATIENT = 'FETCH_CA_PATIENT'
export const FETCH_CA_PATIENT_SUCCESS = 'FETCH_CA_PATIENT_SUCCESS'
export const FETCH_CA_PATIENT_REJECTED = 'FETCH_CA_PATIENT_REJECTED'
export const FETCH_CA_PATIENT_CANCELLED = 'FETCH_CA_PATIENT_CANCELLED'

export const UPDATE_CA_PATIENT = 'UPDATE_CA_PATIENT'
export const UPDATE_CA_PATIENT_SUCCESS = 'UPDATE_CA_PATIENT_SUCCESS'
export const UPDATE_CA_PATIENT_REJECTED = 'UPDATE_CA_PATIENT_REJECTED'
export const UPDATE_CA_PATIENT_CANCELLED = 'UPDATE_CA_PATIENT_CANCELLED'

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CA_PATIENT:
    case UPDATE_CA_PATIENT:
      return {...state, payload: action.payload, isLoading: true}
    case FETCH_CA_PATIENT_SUCCESS:
    case UPDATE_CA_PATIENT_SUCCESS:
    console.log(createCaPatientForm(state, action.payload))
      return createCaPatientForm(action.payload)
      // return {...state, payload: action.payload, isLoading: false}
    case FETCH_CA_PATIENT_CANCELLED:
    case UPDATE_CA_PATIENT_CANCELLED:
      return { ...state, isLoading: false }
    case FETCH_CA_PATIENT_REJECTED:
    case UPDATE_CA_PATIENT_REJECTED:
      return { ...state, payload: action.payload, error: action.error, isLoading: false }
    case ON_CA_PATIENT_FORM_FIELD_CHANGE: {
      // const nextSubcomponent = { fields: { ...action.payload }, isValid: true, isLoading: false }
      // const nextNameComponents = { nameComponents: nextSubcomponent }
      // const form = { ...state.form, ...nextNameComponents }
        
      switch (action.subComponent) {
        case 'nameComponents':
          const fields = state.form.nameComponents.fields.map((item, _id) => {
            if (_id === action.payload._id) {
              return {...item, ...action.payload}
            }
            return item
          })

          const nameComponents = { ...state.form.nameComponents, fields }
          const form = {...state.form, nameComponents, isDirty: true}
          
          return { form }
        default:
          return state
      }      
    }
    default:
      return state

  }
}

function isObject(obj) {
  const type = typeof obj;
  return type === 'function' || type === 'object' && !!obj;
}

const addIdToArray = (a) => {
  if (Array.isArray(a))
    return a.map((e, _id) => (isObject(e) ? {...e, _id} : e))
  else
    return a
}

const createCaPatientForm = (pa) => {
  const meta = {
    disabled: false,
    error: null,
    isValid: false,
    isLoading: false
  }

  pa.createDate = new Date(pa.createDate);
  pa.dateOfBirth = new Date(pa.dateOfBirth);
  
  for (const k in pa) {
    pa[k] = addIdToArray(pa[k])
  }
  
  const form = {...meta, original: {}, fields: {}};

  for (const k in pa) {
    const o = pa[k];
    
    if ((!isObject(o) && !Array.isArray(o)) || o instanceof Date)
      form.fields[k] = o
    if (isObject(o) && !Array.isArray(o))
      form[k] = {...meta, original: {}, fields: {...o}}
    if (Array.isArray(o))
      form[k] = {...meta, original: [], fields: pa[k].slice(0)}
  }

  return { form }
}

export const fetchCaPatient = () => {
  // ???

}

export const updateCaPatient =() => {
  // ???
}

export const fetchCaPatientFulfilled = (payload) => ({
  type: FETCH_CA_PATIENT_SUCCESS,
  payload
})

export const updateCaPatientFulfilled = (payload) => ({
  type: UPDATE_CA_PATIENT_SUCCESS,
  payload
})

export const onCaPatientFormFieldChange = (subComponent, payload) => ({
  type: ON_CA_PATIENT_FORM_FIELD_CHANGE,
  subComponent,
  payload
})
