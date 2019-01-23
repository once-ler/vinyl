import React from 'react';
import { ScrollSync } from 'react-virtualized';
import GridRow from './GridRow';
import LeftSideGrid from './LeftSideGrid';
import RightSideGrid from './RightSideGrid';

export default ({
    columnCount,
    columnWidth,
    height,
    overscanColumnCount,
    overscanRowCount,
    rowHeight,
    rowCount,
    renderBodyCell,
    renderLeftSideCell,
    renderHeaderCell,
    renderLeftHeaderCell,
    list,
    progress,
    freezeColumns,
    leftSideHeaderBackgroundColor,
    leftCornerHeaderBackgroundColor,
    topHeaderBackgroundColor
  }) => (
    <ScrollSync>
      {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {
        const x = scrollLeft / (scrollWidth - clientWidth);
        const y = scrollTop / (scrollHeight - clientHeight);
        
        return (
          <GridRow opacity={progress.loading ? 0.3 : 1}>
            <LeftSideGrid
              overscanColumnCount={overscanColumnCount}
              overscanRowCount={overscanRowCount}
              renderLeftHeaderCell={renderLeftHeaderCell}
              renderLeftSideCell={renderLeftSideCell}
              columnWidth={columnWidth}
              rowHeight={rowHeight}
              rowCount={rowCount}
              scrollTop={scrollTop}
              height={height}
              freezeColumns={freezeColumns}
              leftSideHeaderBackgroundColor={leftSideHeaderBackgroundColor}
              leftCornerHeaderBackgroundColor={leftCornerHeaderBackgroundColor}
            />
            <RightSideGrid
              columnWidth={columnWidth}
              columnCount={columnCount}
              rowHeight={rowHeight}
              overscanColumnCount={overscanColumnCount}
              renderHeaderCell={renderHeaderCell}
              scrollLeft={scrollLeft}
              height={height}
              onScroll={onScroll}
              overscanRowCount={overscanRowCount}
              renderBodyCell={renderBodyCell}
              rowCount={rowCount}
              topHeaderBackgroundColor={topHeaderBackgroundColor}
            />
          </GridRow>
        );
      }}
    </ScrollSync>
  );
