/* @flow */
/* eslint max-len: 0, guard-for-in: 0 */
import pick from 'lodash/pick';
import omit from 'lodash/omit';

export type MergeFreezeListResult = {
  list: Array<any>,
  keys: Array<string>
};

export const unshiftObject = (obj: any, fieldNames: Array<string>) => {
  if (fieldNames.length === 0) return obj;
  const front = pick(obj, fieldNames);
  const rest = omit(obj, fieldNames);
  return {...front, ...rest};
};

export const addRowIndex = (list: Array<any>) => {
  return list.map((o, rowId) => ({rowId, ...o}));
};

export const freezeList = (list: Array<any>, fieldNames: Array<string>) => {
  if (fieldNames.length === 0) return addRowIndex(list);

  const flist = list.map(o => unshiftObject(o, fieldNames));
  return addRowIndex(flist);
};

export const mergeFreezeList = (inlist: Array<any>, fieldNames: Array<string>) => {
  const flist = freezeList(inlist, fieldNames);
  const keys = Object.keys(flist[0]);
  const list = flist.map(d => keys.map(k => typeof d[k] === 'object' ? JSON.stringify(d[k]) : d[k] ));

  // TODO: reorder list and keys, rowId need to be first column.
  return {list, keys};
};

export const formatCellToDate = ({column, content, search}) => {
  const rgx = new RegExp(search, 'i');
  return rgx.test(column) ? (new Date(Math.pow(10, 3) * content).toISOString()).replace(/[TZ]/g, ' ').slice(0, 19) : content;
};
