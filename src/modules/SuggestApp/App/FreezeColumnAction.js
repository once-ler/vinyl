/* @flow */
/* eslint max-len: 0 */

const CHANGE_FREEZE_COLUMNS = 'CHANGE_FREEZE_COLUMNS'

export default (state: any = {}, action: any) => {
  switch (action.type) {
    case CHANGE_FREEZE_COLUMNS:
      return {...state, freezeColumns: action.freezeColumns}
    default:
      return state
  }
}

export const changeFreezeColumns = (freezeColumns: Array<string>) => ({ type: CHANGE_FREEZE_COLUMNS, freezeColumns })
