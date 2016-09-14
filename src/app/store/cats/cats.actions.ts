import { generateId, randomRange } from '../../shared';
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';
import { CatsService } from '../../shared';
import { INITIAL_STATE } from './cats.initial-state';

@Injectable()
export class CatsActions {
  static CAT_CREATED = 'CAT_CREATED';
  static CATS_LOADED = 'CATS_LOADED';
  static CATS_DELETED = 'CATS_DELETED';
  static CAT_DELETED = 'CAT_DELETED';
  static CAT_SELECTED = 'CAT_SELECTED';
  static CAT_CLEARED = 'CAT_CLEARED';
  static CAT_UPDATED = 'CAT_UPDATED';
  public bob: () => number;

  constructor(private ngRedux: NgRedux<IAppState>, private cats: CatsService) { };

  clearSelectedCat = () => {
    this.ngRedux.dispatch({type: CatsActions.CAT_CLEARED});
  };

  selectCat = (cat) => {
    const selectedCat = Object.assign({}, {currentCat: cat, isEditing: true});
    this.ngRedux.dispatch({type: CatsActions.CAT_SELECTED, payload: selectedCat});
  };

  populateCats = () => {
    this.cats
      .createCat(INITIAL_STATE)
      .subscribe(n => this.listAll());
  };

  listAll = () => {

    return this.cats
    .listAll()
    .subscribe(n => {
      this.ngRedux.dispatch({
        type: CatsActions.CATS_LOADED,
        payload: n
      });
    });
  };

  deleteCat = ({id}) => {
    return this.cats
    .deleteCat(id)
    .subscribe(n => {
      this.ngRedux.dispatch({
        type: CatsActions.CAT_DELETED,
        payload: n
      });
    });
  };

  deleteAllCats = () => {
    this.cats.deleteAllCats()
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
    this.cats.createCat(cat).subscribe(result => {
       this.ngRedux
          .dispatch({
            type: CatsActions.CAT_UPDATED,
            payload: result,
          });
    });
  };

  createCat = ({name, headline, description}) => {
    // for now, to avoid image uploading / etc, just pick a random 
    // kitty cat from placeKitten - meow!
    const randomImage = randomRange(100, 200);
    const imageUrl = `https://placekitten.com/${randomImage}/${randomImage}`;

    const id = generateId();

    this.cats
      .createCat({ id, name, description, headline, imageUrl })
      .subscribe(result => {
        this.ngRedux
          .dispatch({
            type: CatsActions.CAT_CREATED,
            payload: result,
          });
      });
  };
}
