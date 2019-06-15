import {
  LIST_FETCH,
  LIST_FETCH_SUCCESS,
  LIST_FETCH_CANCELLED,
  LIST_FETCH_REJECTED,
  listFetchFullfilled,
  LIST_FETCH_REACHED_END
} from './FlatListAction'
import {of, from} from 'rxjs'
import {
  map, 
  catchError, 
  mergeMap, 
  takeUntil,
  switchMap,
  filter, 
  debounceTime, 
  distinctUntilChanged   
} from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import { ofType } from 'redux-observable'
import faker from 'faker'

let j = 0
const randomUsers = (count = 10) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push({
      key: faker.random.uuid(),
      date: faker.date.weekday(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      job: faker.name.jobTitle(),
      index: j++
    })
  }
  return arr
}

const fakePromise = willReject => {
  return new Promise((resolve, reject) => {
    if (willReject || j > 30) {
      reject([])
    }
    resolve(randomUsers(10))
  })
}

export const listFetchEpic = (action$, state$) =>
  action$.pipe(
    ofType(LIST_FETCH),
    mergeMap(action => {
      console.log(action.url)
      const src = typeof action.promise !== 'undefined' ? from(action.promise) : 
        (action.url ? ajax(action.url) : from(fakePromise(true)))
        
      // from(fakePromise(false)).pipe(
      return src.pipe(
          map(d => listFetchFullfilled(d.hasOwnProperty('response') ? d.response : d)),
          takeUntil(action$.pipe(ofType(LIST_FETCH_CANCELLED))),
          catchError(error => of({
            type: LIST_FETCH_REJECTED,
            payload: error,
            error: true
          }))
        )

      }
    )
  )

export const listFetchReachedEndEpic = action$ =>
  action$.pipe(
    ofType(LIST_FETCH_REACHED_END),
    mergeMap(() => of({type:LIST_FETCH}))  
  )

  /*
  retstart
  /api/pubmed/entrez/eutils/esearch.fcgi?db=pubmed&retmax=10&retmode=json&field=source&term=${task.source}
  */

/*
export const fetchSuggestEpic = (action$, state$) =>
  action$.pipe(
    ofType(FETCH_SUGGEST_SELECTED),
    mergeMap(action => {
        const src = typeof action.promise !== 'undefined' ? from(action.promise) : ajax(action.url)
        
        return src.pipe(
          map(d => fetchSuggestSuccess(d.hasOwnProperty('response') ? d.response : d)),
          takeUntil(action$.pipe(ofType(FETCH_SUGGEST_SELECTED_CANCELLED))),
          catchError(error => of({
            type: FETCH_SUGGEST_SELECTED_REJECTED,
            payload: error,
            error: true
          }))
        )
      }
    )
  )  
*/
