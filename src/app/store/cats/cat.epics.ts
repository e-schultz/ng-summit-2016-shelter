import { Injectable } from '@angular/core';
import { IAppState } from '../../store';
import { CatActions } from './';
import { ActionsObservable } from 'redux-observable';
import { CatsService } from '../../shared';
import { IPayloadAction } from '../../store/payload-action.type';
import { NgRedux } from 'ng2-redux';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/combineLatest';
import { Observable } from 'rxjs';


let createErrorHandler = (errType) => err => Observable.of({ type: errType, payload: err });
let createSuccessHandler = (successType) => result => ({ type: successType, payload: result });

@Injectable()
export class CatEpics {
  dispatch: any;
  constructor(private cats: CatsService, ngRedux: NgRedux<IAppState>) {


    this.dispatch = ngRedux.dispatch;

    /*cats.watch()
      .filter(({type}) => type === 'add')
      .pluck('new_val')
      .subscribe(cat => {
        this.dispatch({
          type: CatActions.CAT_CREATED,
          payload: cat
        });
      });

    cats.watch()
      .filter(({type}) => type === 'change')
      .pluck('new_val')
      .subscribe(cat => {
        this.dispatch({
          type: CatActions.CAT_UPDATED,
          payload: cat
        });
      });

    cats.watch()
      .filter(({type}) => type === 'remove')
      .pluck('old_val', 'id')
      .subscribe(id => {

        // Reason for having actionCreators return the JSON only 
        // and not have to go through dispatch? could potentially have just used 
        // an action creator here instead of forming up the payload myself
        this.dispatch({ type: CatActions.CAT_DELETED, payload: { id } });
      });*/

      // TODO: Flesh out better, as right now cats on one screen get added twice
      // since there is a CAT_CREATED event being dispatched from the epic,
      // but also one from watching 

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
    let errorHandler = createErrorHandler({ type: CatActions.CAT_UPDATE_ERROR });
    let catUpdated = createSuccessHandler(CatActions.CAT_UPDATED);

    let updateCat = ({payload}) => this.cats.update(payload)
      .map(result => catUpdated(result))
      .catch(err => errorHandler(err));

    return action$.ofType(CatActions.UPDATE_CAT)
      .do(n => dispatch({ type: CatActions.UPDATING_CAT }))
      .mergeMap(n => updateCat(n));


  }

  updateCatForm = (action$: ActionsObservable<IPayloadAction>) => {

    return action$
      .ofType(CatActions.CAT_FORM_UPDATE)
      .debounceTime(500)
      .map(n => Object.assign({}, n, { type: CatActions.CAT_FORM_UPDATED }));
  }


}
