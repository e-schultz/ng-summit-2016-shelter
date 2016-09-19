import { generateId, randomRange } from '../../shared';
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';
import { CatsService } from '../../shared';
import { INITIAL_STATE } from './cats.initial-state';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/debounceTime';

@Injectable()
export class CatsActions {
  static CREATE_CAT = 'CREATE_CAT';
  static CREATING_CAT = 'CREATING_CAT';
  static CAT_CREATED = 'CAT_CREATED';
  static CAT_CREATE_ERROR = 'CAT_CREATE_ERROR';

  static UPDATE_CAT = 'UPDATE_CAT';
  static CAT_UPDATED = 'CAT_UPDATED';
  static UPDATING_CAT = 'UPDATING_CAT';
  static CAT_UPDATE_ERROR = 'CAT_UPDATE_ERROR';

  static CATS_LOADING = 'CATS_LOADING';
  static CATS_LOADING_ERROR = 'CATS_LOADING_ERROR';
  static CATS_LOADED = 'CATS_LOADED';
  static CATS_DELETED = 'CATS_DELETED';
  static CAT_DELETED = 'CAT_DELETED';
  static CAT_SELECTED = 'CAT_SELECTED';
  static CAT_CLEARED = 'CAT_CLEARED';

  public bob: () => number;

  constructor(private ngRedux: NgRedux<IAppState>, private cats: CatsService) { };

  clearSelectedCat = () => {
    this.ngRedux.dispatch({type: CatsActions.CAT_CLEARED});
  };

  selectCat = (cat) => {
    const selectedCat = Object.assign({}, {currentCat: cat});
    this.ngRedux.dispatch({type: CatsActions.CAT_SELECTED, payload: selectedCat});
  };

  populateCats = () => {
    this.cats
      .create(INITIAL_STATE)
      .debounceTime(500)
      .subscribe(n => this.listAll());
  };

  listAll = () => {

    return this.cats
      .listAll()
      .do(n => this.ngRedux.dispatch({ type: CatsActions.CATS_LOADING }))
    .delay(randomRange(500, 1500))
    .subscribe(n => {
      this.ngRedux.dispatch({
        type: CatsActions.CATS_LOADED,
        payload: n
      });
    },
    (err) => this.ngRedux.dispatch({type: CatsActions.CATS_LOADING_ERROR})
    );
  };

  deleteCat = ({id}) => {
    return this.cats
    .delete(id)
    .subscribe(n => {
      this.ngRedux.dispatch({
        type: CatsActions.CAT_DELETED,
        payload: n
      });
    });
  };

  deleteAllCats = () => {
    this.cats.deleteAll()
    .subscribe(
      cat => {
        this.ngRedux.dispatch({type: CatsActions.CAT_DELETED, payload: cat});
      } ,
      err => console.error(`err: ${err} `));

  };
  submitCat = (cat) => {
    if (!cat.id) {
      this.createCat(cat);
    } else {
      this.updateCat(cat);
    }
  };

  updateCat = (cat) => {
    // with epic 

    this.ngRedux.dispatch({type: CatsActions.UPDATE_CAT, payload: cat });
    /* Without Epic */

    /*
    this.ngRedux.dispatch({type: CatsActions.UPDATING_CAT});
    this.cats.update(cat).subscribe(result => {
       this.ngRedux
          .dispatch({
            type: CatsActions.CAT_UPDATED,
            payload: result,
          });
    },
    err => this.ngRedux.dispatch({type: CatsActions.CAT_UPDATE_ERROR, payload: err}));
    */
  };

  createCat = ({name, headline, description, age, gender, breed}) => {
    // for now, to avoid image uploading / etc, just pick a random 
    // kitty cat from placeKitten - meow!
    const randomImage = randomRange(100, 200);
    const imageUrl = `https://placekitten.com/${randomImage}/${randomImage}`;

    const id = generateId();
    this.ngRedux.dispatch({
      type: CatsActions.CREATE_CAT,
      payload: {
        id, name, description, headline, imageUrl, age, gender, breed
      }
    });

    /*
    this.ngRedux.dispatch({type: CatActions.CREATING_CAT});
    this.cats
      .create({ id, name, description, headline, imageUrl, age, gender, breed })
      .subscribe(result => {
        this.ngRedux
          .dispatch({
            type: CatsActions.CAT_CREATED,
            payload: result,
          });
      },
      err => {
        this.ngRedux.dispatch({type: CatsActions.CAT_CREATE_ERROR});
      });
      */
  };
}
