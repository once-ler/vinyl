import React from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize'
import GridColumn from './GridColumn';
import HeaderGrid from './HeaderGrid';
import BodyGrid from './BodyGrid';
import RightSideGridFixedColumn from './RightSideGridFixedColumn';

export default ({
  columnWidth,
  columnCount,
  rowHeight,
  overscanColumnCount,
  renderHeaderCell,
  scrollLeft,
  height,
  onScroll,
  overscanRowCount,
  renderBodyCell,
  rowCount
}) => (
  <GridColumn>
    <AutoSizer disableHeight>
      {({ width }) => { console.log(width); return (
        <div>
        <RightSideGridFixedColumn width={width - scrollbarSize()} height={rowHeight}>
          <HeaderGrid
            columnWidth={columnWidth}
            columnCount={columnCount}
            height={rowHeight}
            overscanColumnCount={overscanColumnCount}
            cellRenderer={renderHeaderCell}
            rowHeight={rowHeight}
            rowCount={1}
            scrollLeft={scrollLeft}
            width={width - scrollbarSize()}
          />
        </RightSideGridFixedColumn>
        <RightSideGridFixedColumn width={width} height={height}>
          <BodyGrid
            columnWidth={columnWidth}
            columnCount={columnCount}
            height={height}
            onScroll={onScroll}
            overscanColumnCount={overscanColumnCount}
            overscanRowCount={overscanRowCount}
            cellRenderer={renderBodyCell}
            rowHeight={rowHeight}
            rowCount={rowCount}
            width={width}
          />
        </RightSideGridFixedColumn>
        </div>
      )}
      }
    </AutoSizer>
  </GridColumn>
);