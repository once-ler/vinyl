/* @flow */
import t from 'tcomb-form-native'
const { String, Boolean, Number, Date, maybe: Option, struct: Class, list: List, enums: Enumeration } = t

export const CaPatientPhoneInfo = Class({
  number: String,
  type: String
})
 
export const CaPatientEmailInfo = Class({
  email: String,
  type: String
})

const CaPatientIdTypeEnum = Enumeration({
  MRN: 'MRN',
  B: 'Enum B',
  V: 'Enum V'
});

export const CaPatientIdType = Class({
 id: String,
 type: CaPatientIdTypeEnum
})
 
export const CaPatientNameComponents = Class({
  academic: Option(String),
  firstName: Option(String),
  givenName: Option(String),
  initials: Option(String),
  lastName: Option(String),
  lastNameFromSpouse: Option(String),
  lastNamePrefix: Option(String),
  middleName: Option(String),
  preferredName: Option(String),
  preferredNameType: Option(String),
  spouseLastNameFirst: Option(String),
  spouseLastNamePrefix: Option(String),
  suffix: Option(String),
  title: Option(String)
})

export const CaPatientNameComponentsList = Class({
  list: List(CaPatientNameComponents)
})
 
export const CaPatientAddress = Class({
  city: Option(String),
  country: Option(String),
  county: Option(String),
  district: Option(String),
  email: List(CaPatientEmailInfo),
  houseNumber: Option(String),
  phoneNumbers: List(CaPatientPhoneInfo),
  postalCode: Option(String),
  state: Option(String),
  street: List(String),
  type: Option(String)
})
 
export const CaPatientCareTeamMember = Class({
  ids: List(CaPatientIdType),
  name: Option(String),
  type: Option(String)
})
 
export const CaPatientEmergencyContact = Class({
  legalGuardian: Option(String),
  name: Option(String),
  phoneNumbers: List(CaPatientPhoneInfo),
  relation: Option(String)
})
 
export const CaPatientEmploymentInformation = Class({
  employerName: Option(String),
  occupation: Option(String),
  phoneNumbers: List(CaPatientPhoneInfo)
})
 
export const CaPatient = Class({
  addresses: List(CaPatientAddress),
  aliases: List(String),
  careTeam: List(CaPatientCareTeamMember),
  confidentialName: Option(String),
  createDate: Option(Date),
  dateOfBirth: Option(Date),
  emergencyContacts: List(CaPatientEmergencyContact),
  employmentInformation: Option(CaPatientEmploymentInformation),
  ethnicity: List(String),
  gender: Option(String),
  historicalIds: List(CaPatientIdType),
  homeDeployment: Option(String),
  id: Option(String),
  ids: List(CaPatientIdType),
  maritalStatus: Option(String),
  mrn: Option(String),
  name: Option(String),
  nameComponents: List(CaPatientNameComponents),
  nationalIdentifier: Option(String),
  race: List(String),
  rank: Option(String),
  status: Option(String)
})
