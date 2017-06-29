import React from 'react';
import {connect} from 'react-redux';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import connectFunc from './Connect';
import ScrollSync from '../ScrollSync/ScrollSync';
import {Div, TextArea, Resizable, Tether} from '../ScrollSync/Cell';
import HeaderCell from '../ScrollSync/HeaderCell';

const enhanceScrollSyncWithProps = withProps(props => ({
  renderBodyCell: ({ columnIndex, key, parent, rowIndex, style }) => {
    if (columnIndex < 1 || !props.suggestedData || !props.suggestedData.payload[rowIndex]) return;
        
    const { suggestedData: { payload } } = props;
    const { props: { columnCount, width: gridWidth}, state: { scrollLeft: gridScrollLeft } } = parent;
    const content = payload[rowIndex][columnIndex];
    const {width, height} = style;
    const delta = content.length * 5 / width;
    if (delta > 1) {
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
          gridScrollLeft={gridScrollLeft}
        />
      );
    } else {
      return (
        <Div
          key={key}
          style={style}
          contentSize={typeof content === 'string' ? content.length * 5 : -1}
        >
          <div >{content}</div>
        </Div>
      );
    }
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