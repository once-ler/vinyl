import React from 'react';
import { AutoSizer } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize'
import GridColumn from './GridColumn';
import HeaderGrid from './HeaderGrid';
import BodyGrid from './BodyGrid';
import RightSideGridColumn from './RightSideGridColumn';

export default ({
  columnWidth,
  columnCount,
  height,
  renderBodyCell,
  rowCount,
  rowHeight,
  onScroll,
  overscanColumnCount,
  overscanRowCount,
  renderHeaderCell,
  scrollLeft,
  renderRowHeight
}) => (
  <GridColumn>
    <AutoSizer disableHeight>
      {({ width }) => (
        <div>
        <RightSideGridColumn width={width - scrollbarSize()} height={rowHeight}>
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
            backgroundColor="#f0ffff"
          />
        </RightSideGridColumn>
        <RightSideGridColumn width={width} height={height}>
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
        </RightSideGridColumn>
        </div>
        )
      }
    </AutoSizer>
  </GridColumn>
);
