import React from 'react';
import {connect} from 'react-redux';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import connectFunc from './Connect';
import ScrollSync from '../ScrollSync/ScrollSync';
import {Div, Collapse, Textarea} from '../ScrollSync/Cell';
import { HeaderCell } from '../ScrollSync/HeaderCell';

const enhanceScrollSyncWithProps = withProps(props => ({
  renderBodyCell: ({ columnIndex, key, parent, rowIndex, style }) => {
    if (columnIndex < 1 || !props.suggestedData || !props.suggestedData.payload[rowIndex]) return;
    
    // Try for better performance.
    // const { state: {isScrolling, scrollTop, scrollLeft}, props: {height: gridHeight} } = parent;
    // if (!isScrolling && scrollLeft > 0)
    //  return (<div key={key} style={style} >...</div>);

    const { suggestedData: { payload } } = props;
    const content = payload[rowIndex][columnIndex];
    const {width, height} = style;
    const delta = content ? content.length * 5 / width : 0;
    
    return delta > 1 ?
      (
        <div
          key={key}
          style={style}
        >
          <Collapse
            content={content}
          />
        </div>
      ) :
      (
        <Div
          key={key}
          style={style}
        >
          <div style={{padding: '5px 0 0 5px'}}>{content}</div>
        </Div>
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