import React from 'react';
import {connect} from 'react-redux';
import defaultProps from 'recompose/defaultProps';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import Cell from './Cell';
import HeaderCell from './HeaderCell';
import Presentation from './Presentation';

const renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
  if (columnIndex < 1) return;

  return renderLeftSideCell({ columnIndex, key, rowIndex, style });
};

const renderLeftSideCell = ({ columnIndex, key, rowIndex, style }) => (
  <Cell
    key={key}
    style={style}
  >
    {`R${rowIndex}, C${columnIndex}`}
  </Cell>
);

const renderHeaderCell = ({ columnIndex, key, rowIndex, style }) => {
  if (columnIndex < 1) return;

  return renderLeftHeaderCell({ columnIndex, key, rowIndex, style });
};

const renderLeftHeaderCell = ({ columnIndex, key, rowIndex, style }) => (
  <HeaderCell
    key={key}
    style={style}
  >
    {`C${columnIndex}`}
  </HeaderCell>
);

const mapDispatchToState = dispatch => ({
  dispatch
});

const connectFunc = connect(
  state => ({

  }),
  mapDispatchToState
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
