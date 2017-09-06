import React from 'react';
import scrollbarSize from 'dom-helpers/util/scrollbarSize';
import LeftSideGridColumn from './LeftSideGridColumn';
import LeftSideGridContainer from './LeftSideGridContainer';
import LeftSideGridWrapper from './LeftSideGridWrapper';
import HeaderGrid from './HeaderGrid';

export default ({
  columnWidth,
  height,
  overscanColumnCount,
  overscanRowCount,
  renderLeftHeaderCell,
  renderLeftSideCell,
  rowHeight,
  rowCount,
  scrollTop
}) => (
  <div>
    <LeftSideGridColumn
      renderLeftHeaderCell={renderLeftHeaderCell}
      columnWidth={columnWidth}
      rowHeight={rowHeight}
      columnWidth={columnWidth}
    />
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
          backgroundColor="#f0ffff"
        />
      </LeftSideGridWrapper>
    </LeftSideGridContainer>
  </div>
);