/* @flow */
import pick from 'lodash/pick';
import omit from 'lodash/omit';

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

export const formatCellToDate = ({column, content, search}) => {
  const rgx = new RegExp(search, 'i');
  return rgx.test(column) ? (new Date(Math.pow(10, 3) * content).toISOString()).replace(/[TZ]/g, ' ').slice(0, 19) : content;
};
