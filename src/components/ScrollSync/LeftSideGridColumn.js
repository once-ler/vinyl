import React from 'react';
import styled from 'styled-components';
import { Grid } from 'react-virtualized';
import HeaderGrid from './HeaderGrid';
import LeftSideGridContainer from './LeftSideGridContainer';

export default ({
  renderLeftHeaderCell,
  columnWidth,
  rowHeight,
  freezeColumns,
  backgroundColor
}) => (
  <LeftSideGridContainer
    style={{
      position: 'absolute',
      left: 0,
      top: 0
    }}
  >
    <HeaderGrid
      cellRenderer={renderLeftHeaderCell}
      width={columnWidth + (columnWidth * freezeColumns)}
      height={rowHeight}
      rowHeight={rowHeight}
      columnWidth={columnWidth}
      rowCount={1}
      columnCount={1 + freezeColumns}
      backgroundColor={backgroundColor || '#ffc1c1'}
    />
  </LeftSideGridContainer>
);
