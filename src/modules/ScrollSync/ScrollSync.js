/* @flow */
import React from 'react';
import {connect} from 'react-redux';
import defaultProps from 'recompose/defaultProps';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import renderer from './Renderer'
import Presentation from './Presentation';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const connectFunc = connect(
  state => ({
    list: state.scrollsync.list,
    columns: state.scrollsync.columns,
    columnCount: state.scrollsync.columnCount,
    rowCount: state.scrollsync.rowCount,
    freezeColumns: state.scrollsync.freezeColumns,
    progress: state.progress
  }),
  mapDispatchToProps
);

const baseProps = defaultProps({
  columnCount: 50,
  rowCount: 20,
  columnWidth: 140,    
  fontFamily: `Helvetica, Arial, sans-serif`,
  fontSize: '0.8em',
  height: 300,
  overscanColumnCount: 0,
  overscanRowCount: 5,
  rowHeight: 40,
  freezeColumns: 0
})

export default compose(
  baseProps,
  connectFunc,
  renderer
)(Presentation);
