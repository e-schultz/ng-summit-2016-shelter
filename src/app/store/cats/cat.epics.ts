import { Injectable } from '@angular/core';
import { IAppState } from '../../store';
import { CatActions } from './';
import { ActionsObservable } from 'redux-observable';
import { CatsService } from '../../shared';
import { IPayloadAction } from '../../store/payload-action.type';
import { NgRedux } from 'ng2-redux';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs';


let createErrorHandler = (errType) => err => Observable.of({ type: errType, payload: err });
let createSuccessHandler = (successType) => result => ({type: successType, payload: result});

@Injectable()
export class CatEpics {
  dispatch: any;
  constructor(private cats: CatsService, ngRedux: NgRedux<IAppState>) {
    this.dispatch = ngRedux.dispatch;
  }

  create = (action$: ActionsObservable<IPayloadAction>) => {
    let dispatch = this.dispatch;
    let errorHandler = createErrorHandler(CatActions.CAT_CREATE_ERROR);
    let catCreated = createSuccessHandler(CatActions.CAT_CREATED);

    let createCat = ({payload}) => this.cats.create(payload)
      .map(result => catCreated(result))
      .catch(err => errorHandler(err));

    return action$.ofType(CatActions.CREATE_CAT)
      .do(n => dispatch({ type: CatActions.CREATING_CAT }))
      .mergeMap(n => createCat(n));
  }

  update = (action$: ActionsObservable<IPayloadAction>) => {
    let dispatch = this.dispatch;
    let errorHandler = createErrorHandler({type: CatActions.CAT_UPDATE_ERROR});
    let catUpdated = createSuccessHandler(CatActions.CAT_UPDATED);

    let updateCat = ({payload}) => this.cats.update(payload)
      .map(result => catUpdated(result))
      .catch(err => errorHandler(err));

    return action$.ofType(CatActions.UPDATE_CAT)
      .do(n => dispatch({ type: CatActions.UPDATING_CAT }))
      .mergeMap(n => updateCat(n));


  }


}
