import React from 'react';
// import {connect} from 'react-redux';
import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import connectFunc from './Connect';
import ScrollSync, {Div, Collapse, HeaderCell} from '../../ScrollSync';
import {formatCellToDate} from './Util';

const renderCell = ({props, columnIndex, key, rowIndex, style}) => {
  const { suggestedData: { payload } } = props;
  let content = payload[rowIndex][columnIndex];
  content = formatCellToDate({content, column: props.columns[columnIndex], search: 'created'});
  const {width, height} = style;
  const delta = content ? content.length * 3 / width : 0;
  
  return delta > 1 ?
    (
      <div
        key={key}
        style={style}
      >
        <Collapse
          content={content}
          maxChar={(Math.ceil(width * 0.09))}
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
};

const enhanceScrollSyncWithProps = withProps(props => ({
  renderBodyCell: ({ columnIndex, key, parent, rowIndex, style }) => {
    if (columnIndex < (1 + props.freezeColumns) || !props.suggestedData || !props.suggestedData.payload[rowIndex]) return;
    
    return renderCell({props, columnIndex, key, rowIndex, style});
  },
  renderHeaderCell: ({ columnIndex, key, rowIndex, style }) => (
    <HeaderCell
      key={key}
      style={style}
    >
      <span style={{padding: '0 5px'}}>{(props.columns[columnIndex] || `C${columnIndex}`).replace(/_/g, ' ')}</span>
    </HeaderCell>
  ),
  renderLeftSideCell: ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex > 0 && props.suggestedData && props.suggestedData.payload[rowIndex])
      return renderCell({props, columnIndex, key, rowIndex, style});

    return (
      <Div
        key={key}
        style={style}
      >
        <span style={{margin: 'auto'}}>{ columnIndex > 0 ? `R${rowIndex}, C${columnIndex}` : rowIndex }</span>
      </Div>
    );
  },
  renderLeftHeaderCell: ({ columnIndex, key, rowIndex, style }) => (
    <HeaderCell
      key={key}
      style={style}
    >
    <span style={{padding: '0 5px'}}>{(props.columns[columnIndex] || `C${columnIndex}`).replace(/_/g, ' ')}</span>
    </HeaderCell>
  )
}));

export default compose(
  connectFunc,
  enhanceScrollSyncWithProps
)(ScrollSync);
