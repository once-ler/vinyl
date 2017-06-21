import React from 'react';
import {connect} from 'react-redux';
import defaultProps from 'recompose/defaultProps';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import {renderBodyCell, renderLeftSideCell, renderHeaderCell, renderLeftHeaderCell} from './Renderer';
import Presentation from './Presentation';

const mapDispatchToProps = dispatch => ({
  dispatch
});

const connectFunc = connect(
  state => ({
    list: state.scrollsync.list,
    columns: state.scrollsync.columns,
    progress: state.progress
  }),
  mapDispatchToProps
);

export default compose(
  defaultProps({
    renderBodyCell,
    renderLeftSideCell,
    renderHeaderCell,
    renderLeftHeaderCell
  }),
  withProps({
    columnWidth: 75,
    columnCount: 50,
    fontFamily: `'Trebuchet MS', Helvetica, sans-serif`,
    fontSize: '0.8em',
    height: 300,
    overscanColumnCount: 0,
    overscanRowCount: 5,
    rowHeight: 40,
    rowCount: 100  
  }),
  connectFunc
)(Presentation);
