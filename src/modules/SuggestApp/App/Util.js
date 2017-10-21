/* @flow */
import pick from 'lodash/pick';
import omit from 'lodash/omit';

export const unshiftObject = (obj: any, fieldNames: Array<string>) => {
  if (fieldNames.length === 0) return obj;
  const front = pick(obj, fieldNames);
  const rest = omit(obj, fieldNames);
  // let o = {};
  // for (const k in front) o[k] = front[k];
  // for (const k in rest) o[k] = rest[k];
  // return o;
  return {...front, ...rest};
};

export const freezeList = (list: Array<any>, fieldNames: Array<string>) => {
  if (fieldNames.length === 0) return list;

  return list.map(o => unshiftObject(o, fieldNames));
};
