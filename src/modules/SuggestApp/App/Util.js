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
