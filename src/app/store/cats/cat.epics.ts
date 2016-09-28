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


const createActionObservable = (errType) => err => Observable.of({ type: errType, payload: err });
const createAction = (successType) => result => ({ type: successType, payload: result });

// const catCreatError = createActionObservable(CatActions.CAT_CREATE_ERROR);
// const catCreated = createAction(CatActions.CAT_CREATED);

// const catUpdateError = createActionObservable({ type: CatActions.CAT_UPDATE_ERROR });
// const catUpdated = createAction(CatActions.CAT_UPDATED);

@Injectable()
export class CatEpics {
  dispatch: any;
  
  catCreatError = createActionObservable(CatActions.CAT_CREATE_ERROR);
  catCreated = createAction(CatActions.CAT_CREATED);
  catUpdateError = createActionObservable({ type: CatActions.CAT_UPDATE_ERROR });
  catUpdated = createAction(CatActions.CAT_UPDATED);

  constructor(private cats: CatsService, private ngRedux: NgRedux<IAppState>) {

    
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
    let createCat = ({payload}) => this.cats.create(payload)
      .map(result => this.catCreated(result))
      .catch(err => this.catCreatError(err));

    return action$.ofType(CatActions.CREATE_CAT)
      .do(n => dispatch({ type: CatActions.CREATING_CAT }))
      .mergeMap(n => createCat(n));

    /*
    Does the same as the above, but without some of the helper functions.

    return action$.ofType(CatActions.CREATE_CAT)
      .do(n => this.ngRedux.dispatch({ type: CatActions.CREATING_CAT }))
      .mergeMap(action => {
        return this.cats
          .create(action.payload)
          .map(result => {
            return {  type: CatActions.CAT_CREATED, payload: result };
          })
          .catch(err => Observable.of({ type: CatActions.CAT_CREATE_ERROR, payload: err }));
      });*/
  }

  update = (action$: ActionsObservable<IPayloadAction>) => {
    let dispatch = this.dispatch;
    let updateCat = ({payload}) => this.cats.update(payload)
      .map(result => this.catUpdated(result))
      .catch(err => this.catUpdateError(err));

    return action$.ofType(CatActions.UPDATE_CAT)
      .do(n => dispatch({ type: CatActions.UPDATING_CAT }))
      .mergeMap(n => updateCat(n));


  };

  updateCatForm = (action$: ActionsObservable<IPayloadAction>) => {

    return action$
      .ofType(CatActions.CAT_FORM_UPDATE)
      .debounceTime(500)
      .map(n => Object.assign({}, n, { type: CatActions.CAT_FORM_UPDATED }));
  };


}
