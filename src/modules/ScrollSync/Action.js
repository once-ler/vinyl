/* @flow */
import type {MergeFreezeListResult} from './MergeFreezeList'
import {mergeFreezeList} from './MergeFreezeList'

export const SCROLLSYNC_LIST = 'SCROLLSYNC_LIST'
export const SCROLLSYNC_LIST_RESET = 'SCROLLSYNC_LIST_RESET'
export const SCROLLSYNC_COLUMNS = 'SCROLLSYNC_COLUMNS'
export const SCROLLSYNC_COLUMN_COUNT = 'SCROLLSYNC_COLUMN_COUNT'
export const SCROLLSYNC_ROW_COUNT = 'SCROLLSYNC_ROW_COUNT'
export const SCROLLSYNC_FREEZE_COLUMNS = 'SCROLLSYNC_FREEZE_COLUMNS'
export const SCROLLSYNC_MERGE_FREEZELIST = 'SCROLLSYNC_MERGE_FREEZELIST'

const initialState = {
  list: [],
  columns: [],
  rowCount: 20,
  columnCount: 50,
  freezeColumns: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SCROLLSYNC_LIST:
      const list = action.list.slice()
      return { ...state, list}
    case SCROLLSYNC_LIST_RESET:
      return initialState
    case SCROLLSYNC_COLUMNS:
      const columns = action.columns.slice()
      return {...state, columns}
    case SCROLLSYNC_COLUMN_COUNT:
      return {...state, columnCount: action.columnCount}
    case SCROLLSYNC_ROW_COUNT:
      return {...state, rowCount: action.rowCount}
    case SCROLLSYNC_FREEZE_COLUMNS:
      return {...state, freezeColumns: action.freezeColumns}
    case SCROLLSYNC_MERGE_FREEZELIST:
      const result: MergeFreezeListResult = mergeFreezeList(action.list, action.keys);
      const {list: newList, keys} = result;
      
      return {
        ...state,
        list: newList,
        columns: keys,
        columnCount: keys.length,
        rowCount: newList.length,
        freezeColumns: action.keys.length
      }

    default:
      return state
  }
}

export const setList = list => {
  return {
    type: SCROLLSYNC_LIST,
    list
  }
}

export const resetList = () => {
  return {
    type: SCROLLSYNC_LIST_RESET
  }
}

export const setColumns = columns => {
  return {
    type: SCROLLSYNC_COLUMNS,
    columns
  }
}

export const setRowCount = rowCount => {
  return {
    type: SCROLLSYNC_ROW_COUNT,
    rowCount
  }
}

export const setColumnCount = columnCount => {
  return {
    type: SCROLLSYNC_COLUMN_COUNT,
    columnCount
  }
}

export const setFreezeColumns = freezeColumns => {
  return {
    type: SCROLLSYNC_FREEZE_COLUMNS,
    freezeColumns
  }
}

/*
  Given a list of column names to freeze, returns a tuple of reformatted dataset and column name list.
*/
export const setMergeFreezeList = (list, keys) => {
  return {
    type: SCROLLSYNC_MERGE_FREEZELIST,
    list,
    keys
  }
}

export default reducer
