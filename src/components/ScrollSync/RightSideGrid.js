import React from 'react';
import { AutoSizer, Grid } from 'react-virtualized';
import scrollbarSize from 'dom-helpers/util/scrollbarSize'
import GridColumn from './GridColumn';
import HeaderGrid from './HeaderGrid';
import BodyGrid from './BodyGrid';

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
      {({ width }) => (
        <div>
          <HeaderGrid>
            <Grid
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
          </HeaderGrid>
          <BodyGrid>
            <Grid
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
          </BodyGrid>
        </div>
      )}
    </AutoSizer>
  </GridColumn>
);
