import React from 'react';
import { ScrollSync } from 'react-virtualized';
import GridRow from './GridRow';
import LeftSideGridFixedColumn from './LeftSideGridFixedColumn';
import LeftSideGridColumn from './LeftSideGridColumn';
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
    renderLeftHeaderCell
  }) => { console.log(rowHeight); return (
    <ScrollSync>
      {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {
        const x = scrollLeft / (scrollWidth - clientWidth)
        const y = scrollTop / (scrollHeight - clientHeight)

        return (
          <GridRow>
            <LeftSideGridFixedColumn
              renderLeftHeaderCell={renderLeftHeaderCell}
              columnWidth={columnWidth}
              rowHeight={rowHeight}
              columnWidth={columnWidth}
            />

            <LeftSideGridColumn
              overscanColumnCount={overscanColumnCount}
              overscanRowCount={overscanRowCount}
              renderLeftSideCell={renderLeftSideCell}
              columnWidth={columnWidth}
              rowHeight={rowHeight}
              rowCount={rowCount}
              scrollTop={scrollTop}
              columnWidth={columnWidth} 
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
            />
          </GridRow>
        )
      }}
    </ScrollSync>
  );
};
