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

  public bob: ()=>number;

  constructor(private ngRedux: NgRedux<IAppState>, private cats: CatsService) { };

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
  }

  deleteCat = ({id}) => {
    return this.cats
    .deleteCat(id)
    .subscribe(n => {
      this.ngRedux.dispatch({
        type: CatsActions.CAT_DELETED,
        payload: n
      });
    });
  }

  deleteAllCats = () => {
    this.cats.deleteAllCats()
    .subscribe(
      cat => {
        this.ngRedux.dispatch({type: CatsActions.CAT_DELETED, payload: cat});
      } ,
      err => console.error(`err: ${err} `));

  }

  createCat = ({name, headline, description}) => {
    // for now, to avoid image uploading / etc, just pick a random 
    // kitty cat from placeKitten - meow!
    const randomImage = randomRange(100, 200);
    const url = `https://placekitten.com/${randomImage}/${randomImage}`;
    const images = [{ url }];
    const id = generateId();

    this.cats
      .createCat({ id, name, description, headline, images })
      .subscribe(result => {
        this.ngRedux
          .dispatch({
            type: CatsActions.CAT_CREATED,
            payload: result,
          });
      });
  };
}
