import React from 'react';
import styled from 'styled-components';
import { Grid } from 'react-virtualized';
import HeaderGrid from './HeaderGrid';
import LeftSideGridContainer from './LeftSideGridContainer';

export default ({
  renderLeftHeaderCell,
  columnWidth,
  rowHeight
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
      width={columnWidth}
      height={rowHeight}
      rowHeight={rowHeight}
      columnWidth={columnWidth}
      rowCount={1}
      columnCount={1}
      backgroundColor="#f0ffff"
    />
  </LeftSideGridContainer>
);
