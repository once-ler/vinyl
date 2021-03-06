/* @flow */
import React from 'react';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import SlideContainer from '../../components/Container/SlideContainer';
import Container from '../../components/Container/Container';

Calendar.momentLocalizer(moment);

const mapDispatchToState = dispatch => ({
  dispatch
});

const connectFunc = connect(
  state => ({ events: state.calendar.events }),
  mapDispatchToState
);

const Presentation = props => {
  const {events, ...rest} = props;
  return (
    <SlideContainer direction="down">
    <Container backgroundColor="#fefefe">
      <Calendar
        style={{width: '98%', margin:'auto', fontFamily: 'Helvetica', height: '500px'}}
        {...rest}
        events={events}
        startAccessor='start'
        endAccessor='end'
        defaultDate={new Date('2015-03-01')}
      />
    </Container>
    </SlideContainer>
  );
};

export default compose(
  connectFunc  
)(Presentation);
