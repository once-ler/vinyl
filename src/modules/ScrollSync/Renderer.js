import React from 'react';
import withProps from 'recompose/withProps';
import Cell from './Cell';
import HeaderCell from './HeaderCell';

export const renderBodyCell = ({ columnIndex, key, rowIndex, style }) => {
  if (columnIndex < 1) return;
  return renderLeftSideCell({ columnIndex, key, rowIndex, style });
};

export const renderLeftSideCell = ({ columnIndex, key, rowIndex, style }) => (
  <Cell
    key={key}
    style={style}
  >
    <span style={{margin: 'auto'}}>{ columnIndex > 0 ? `R${rowIndex}, C${columnIndex}` : rowIndex }</span>
  </Cell>
);

export const renderHeaderCell = ({ columnIndex, key, rowIndex, style }) => {
  if (columnIndex < 1) return;

  return renderLeftHeaderCell({ columnIndex, key, rowIndex, style });
};

export const renderLeftHeaderCell = ({ columnIndex, key, rowIndex, style }) => (
  <HeaderCell
    key={key}
    style={style}
  >
    {columnIndex > 0 ? `C${columnIndex}` : ''}
  </HeaderCell>
);

export default {
  renderBodyCell,
  renderHeaderCell,
  renderLeftHeaderCell,
  renderLeftSideCell
};
