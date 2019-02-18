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
  renderLeftIndexCell,
  rowHeight,
  rowCount,
  scrollTop,
  freezeColumns,
  leftSideHeaderBackgroundColor,
  leftCornerHeaderBackgroundColor
}) => (
  <div>
    <LeftSideGridColumn
      renderLeftHeaderCell={renderLeftHeaderCell}
      columnWidth={columnWidth}
      rowHeight={rowHeight}
      freezeColumns={freezeColumns}
      backgroundColor={leftCornerHeaderBackgroundColor || '#ffc1c1'}
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
          columnCount={1 + freezeColumns}
          height={height - scrollbarSize()}
          rowHeight={rowHeight}
          rowCount={rowCount}
          scrollTop={scrollTop}
          width={columnWidth + (columnWidth * freezeColumns)}
          backgroundColor={leftSideHeaderBackgroundColor || '#f8f8ff'}
        />
      </LeftSideGridWrapper>
    </LeftSideGridContainer>
  </div>
);
