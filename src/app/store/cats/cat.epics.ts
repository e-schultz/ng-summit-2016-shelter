import { Injectable } from '@angular/core';
import { CatsActions } from './';
import { ActionsObservable } from 'redux-observable';
import { Action } from 'redux';
import { CatsService } from '../../shared';
import { NgRedux } from 'ng2-redux';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs';

interface IPayloadAction extends Action {
  payload: any;
}

let createErrorHandler = (errType) => err => Observable.of({ type: errType, payload: err });
let createSuccessHandler = (successType) => result => ({type: successType, payload: result});

@Injectable()
export class CatEpics {
  dispatch: any;
  constructor(private cats: CatsService, ngRedux: NgRedux<any>) {
    this.dispatch = ngRedux.dispatch;
  }

  create = (action$: ActionsObservable<IPayloadAction>) => {
    let dispatch = this.dispatch;
    let errorHandler = createErrorHandler(CatsActions.CAT_CREATE_ERROR);
    let catCreated = createSuccessHandler(CatsActions.CAT_CREATED);

    let createCat = ({payload}) => this.cats.create(payload)
      .map(result => catCreated(result))
      .catch(err => errorHandler(err));

    return action$.ofType(CatsActions.CREATE_CAT)
      .do(n => dispatch({ type: CatsActions.CREATING_CAT }))
      .mergeMap(n => createCat(n));
  }

  update = (action$: ActionsObservable<IPayloadAction>) => {
    let dispatch = this.dispatch;
    let errorHandler = createErrorHandler({type: CatsActions.CAT_UPDATE_ERROR});
    let catUpdated = createSuccessHandler(CatsActions.CAT_UPDATED);

    let updateCat = ({payload}) => this.cats.update(payload)
      .map(result => catUpdated(result))
      .catch(err => errorHandler(err));

    return action$.ofType(CatsActions.UPDATE_CAT)
      .do(n => dispatch({ type: CatsActions.UPDATING_CAT }))
      .mergeMap(n => updateCat(n));


  }


}
