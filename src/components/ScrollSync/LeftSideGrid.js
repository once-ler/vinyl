import React from 'react';
import {Grid} from 'react-virtualized';
import LeftSideGridContainer from './LeftSideGridContainer';
import LeftSideGridWrapper from './LeftSideGridWrapper';
import HeaderGrid from './HeaderGrid';
import scrollbarSize from 'dom-helpers/util/scrollbarSize'

export default ({
  overscanColumnCount,
  overscanRowCount,
  renderLeftSideCell,
  columnWidth,
  rowHeight,
  rowCount,
  scrollTop,
  height
}) => { console.log(height); return (
  <LeftSideGridContainer
    style={{
      position: 'absolute',
      left: 0,
      top: rowHeight
    }}
  >
    <LeftSideGridWrapper>
      <HeaderGrid
        overscanColumnCount={overscanColumnCount}
        overscanRowCount={overscanRowCount}
        cellRenderer={renderLeftSideCell}
        columnWidth={columnWidth}
        columnCount={1}
        height={height - scrollbarSize()}
        rowHeight={rowHeight}
        rowCount={rowCount}
        scrollTop={scrollTop}
        width={columnWidth}
      />
    </LeftSideGridWrapper>
  </LeftSideGridContainer>
);
};
