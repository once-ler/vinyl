/* @flow */
import React from 'react'
import ScrollSync from './index'
import Progress from 'react-progress-2'
import lifecycle from 'recompose/lifecycle'

const ioniconFontStyles = `@font-face {
  src: url(${ioniconsFont});
  font-family: Ionicons;
}`

const enhanceWithLifecycle = lifecycle({
  componentDidMount() {    
  }
})

const Presentation = () =>
  <div>
    <Progress.Component />
    <ScrollSync />
  </div>

export default enhanceWithLifecycle(Presentation)
