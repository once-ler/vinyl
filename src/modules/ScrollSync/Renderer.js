/* @flow */
import React from 'react'
import withProps from 'recompose/withProps'
import Cell from './Cell'
import HeaderCell from './HeaderCell'
import {Div, Collapse} from './Cell'

const renderCell = ({props, columnIndex, key, rowIndex, style}) => {
  const {list} = props
  let content = ''
  list && list[rowIndex] && (content = list[rowIndex][columnIndex]) 
  const {width, height} = style
  const delta = content ? content.length * 3 / width : 0
  
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
        <div style={{padding: '5px 15px'}}>{content}</div>
      </Div>
    )
}

const enhanceScrollSyncWithProps = withProps(props => ({
  renderBodyCell: ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < (1 + props.freezeColumns) || !props.list[rowIndex]) return;
    
    return renderCell({props, columnIndex, key, rowIndex, style})
  },
  renderLeftSideCell: ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex > 0 && props.list && props.list[rowIndex])
      return renderCell({props, columnIndex, key, rowIndex, style})

    return (
      <Div
        key={key}
        style={style}
      >
        <span style={{padding: '5px 0 0 15px'}}>{ columnIndex > 0 ? `R${rowIndex}, C${columnIndex}` : rowIndex }</span>
      </Div>
    )
  },
  renderHeaderCell: ({ columnIndex, key, rowIndex, style }) => {
    const maybeCol = props.columns[columnIndex]
    const col = maybeCol && typeof maybeCol === 'string' ? maybeCol.toUpperCase() : maybeCol 
    return (
      <HeaderCell
        key={key}
        style={style}
      >
        <span style={{padding: '0 5px'}}>{(col || `C${columnIndex}`).replace(/_/g, ' ')}</span>
      </HeaderCell>
    )
  },
  renderLeftHeaderCell: ({ columnIndex, key, rowIndex, style }) => {
    const maybeCol = props.columns[columnIndex]
    const col = maybeCol && typeof maybeCol === 'string' ? maybeCol.toUpperCase() : maybeCol 
    return (
      <HeaderCell
        key={key}
        style={style}
      >
        <span style={{padding: '0 5px'}}>{(col || `C${columnIndex}`).replace(/_/g, ' ')}</span>
      </HeaderCell>
    )
  }
}))

export default enhanceScrollSyncWithProps
