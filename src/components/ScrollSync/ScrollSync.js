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
    list
  }) => (
    <ScrollSync>
      {({ clientHeight, clientWidth, onScroll, scrollHeight, scrollLeft, scrollTop, scrollWidth }) => {
        const x = scrollLeft / (scrollWidth - clientWidth)
        const y = scrollTop / (scrollHeight - clientHeight)
        
        console.log(list);

        return (
          <GridRow>
            <LeftSideGrid
              overscanColumnCount={overscanColumnCount}
              overscanRowCount={overscanRowCount}
              renderLeftHeaderCell={renderLeftHeaderCell}
              renderLeftSideCell={renderLeftSideCell}              
              columnWidth={columnWidth}
              rowHeight={rowHeight}
              rowCount={rowCount}
              scrollTop={scrollTop}
              columnWidth={columnWidth}
              height={height}
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
