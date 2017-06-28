import React from 'react';
import {connect} from 'react-redux';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import connectFunc from './Connect';
import ScrollSync from '../ScrollSync/ScrollSync';
import {Div, TextArea} from '../ScrollSync/Cell';
import HeaderCell from '../ScrollSync/HeaderCell';

const enhanceScrollSyncWithProps = withProps(props => ({
  renderBodyCell: ({ columnIndex, key, parent, rowIndex, style }) => {
    if (columnIndex < 1 || !props.suggestedData || !props.suggestedData.payload[rowIndex]) return;
    
    const { suggestedData: { payload } } = props;
    const { props: { columnCount, width: gridWidth } } = parent;
    const content = payload[rowIndex][columnIndex];
    
    return (
      <TextArea
        key={key}
        style={style}
        contentSize={typeof content === 'string' ? content.length * 5 : -1}
        value={content}
        readOnly
        rowIndex={rowIndex}
        columnIndex={columnIndex}
        columnCount={columnCount}
        gridWidth={gridWidth}
      />
    );
  },
  renderHeaderCell: ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1) return;

    return (
      <HeaderCell
        key={key}
        style={style}
      >
        <span style={{padding: '0 5px'}}>{(props.columns[columnIndex] || `C${columnIndex}`).replace(/_/g, ' ')}</span>
      </HeaderCell>
    );
  }
}));

export default compose(
  connectFunc,
  enhanceScrollSyncWithProps
)(ScrollSync);
;