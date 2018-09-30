/* @flow */
/* eslint max-len: 0 */

const CHANGE_FREEZE_COLUMNS = 'CHANGE_FREEZE_COLUMNS'
const RESET_FREEZE_COLUMNS = 'RESET_FREEZE_COLUMNS'

const initialState = {
  columns: []
}

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_FREEZE_COLUMNS:
      return {...state, columns: action.columns}
    case RESET_FREEZE_COLUMNS:
      return initialState
    default:
      return state
  }
}

export const changeFreezeColumns = (columns: Array<string>) => ({ type: CHANGE_FREEZE_COLUMNS, columns })
export const resetFreezeColumns = () => ({ type: RESET_FREEZE_COLUMNS })
