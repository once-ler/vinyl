import React from 'react'
import withProps from 'recompose/withProps'
import Cell from './Cell'
import HeaderCell from './HeaderCell'
import {Div, Collapse} from './Cell'

const renderCell = ({props, columnIndex, key, rowIndex, style}) => {
  // const { suggestedData: { payload } } = props
  const {list} = props
  // let content = payload[rowIndex][columnIndex]
  let content = ''
  list && list[rowIndex] && (content = list[rowIndex][columnIndex]) 
  // content = formatCellToDate({content, column: props.columns[columnIndex], search: 'created'})
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
        <div style={{padding: '5px 0 0 5px'}}>{content}</div>
      </Div>
    )
}

const enhanceScrollSyncWithProps = withProps(props => ({

  renderBodyCell: ({ columnIndex, key, rowIndex, style }) => {
    // if (columnIndex < 1) return
    // return renderLeftSideCell({ columnIndex, key, rowIndex, style })
    if (columnIndex < (1 + props.freezeColumns) || !props.list[rowIndex]) return;
    
    return renderCell({props, columnIndex, key, rowIndex, style})
  },

  renderLeftSideCell: ({ columnIndex, key, rowIndex, style }) => {

    /*
    return (
      <Cell
        key={key}
        style={style}
      >
        <span style={{margin: 'auto'}}>{ columnIndex > 0 ? `R${rowIndex}, C${columnIndex}` : rowIndex }</span>
      </Cell>
    )
    */

  if (columnIndex > 0 && props.list && props.list[rowIndex])
    return renderCell({props, columnIndex, key, rowIndex, style})

    return (
      <Div
        key={key}
        style={style}
      >
        <span style={{margin: 'auto'}}>{ columnIndex > 0 ? `R${rowIndex}, C${columnIndex}` : rowIndex }</span>
      </Div>
    )
  },

  renderHeaderCell: ({ columnIndex, key, rowIndex, style }) => {
    if (columnIndex < 1) return

    // return renderLeftHeaderCell({ columnIndex, key, rowIndex, style })
    return (
      <HeaderCell
        key={key}
        style={style}
      >
        <span style={{padding: '0 5px'}}>{(props.columns[columnIndex] || `C${columnIndex}`).replace(/_/g, ' ')}</span>
      </HeaderCell>
    )
  },

  renderLeftHeaderCell: ({ columnIndex, key, rowIndex, style }) => (
    <HeaderCell
      key={key}
      style={style}
    >
      {columnIndex > 0 ? `C${columnIndex}` : ''}
    </HeaderCell>
  )
}))

export default enhanceScrollSyncWithProps
