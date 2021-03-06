import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';
import { BreedsService } from '../../shared';
import { INITIAL_STATE } from './breeds.reducer';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class BreedActions {
  static BREED_CREATED = 'BREED_CREATED';
  static BREEDS_LOADING = 'BREEDS_LOADING';
  static BREEDS_LOADING_ERROR = 'BREEDS_LOADING_ERROR';
  static BREEDS_LOADED = 'BREEDS_LOADED';
  static BREEDS_DELETED = 'BREEDS_DELETED';
  static BREED_DELETED = 'BREED_DELETED';
  static BREED_SELECTED = 'BREED_SELECTED';
  static BREED_CLEARED = 'BREED_CLEARED';
  static BREED_UPDATED = 'BREED_UPDATED';


  constructor(private ngRedux: NgRedux<IAppState>, private breeds: BreedsService) { };



  populate = () => {
    this.breeds
      .create(INITIAL_STATE)
      .subscribe(n => this.listAll());
  };

  listAll = () => {

    return this.breeds
      .listAll()
      .do(n => this.ngRedux.dispatch({ type: BreedActions.BREEDS_LOADING }))
      .delay(1000)
      .subscribe(n => {
        this.ngRedux.dispatch({
          type: BreedActions.BREEDS_LOADED,
          payload: n
        });
      },
      (err) => this.ngRedux.dispatch({ type: BreedActions.BREEDS_LOADING_ERROR })
      );
  };

  delete = ({id}) => {
    return this.breeds
      .delete(id)
      .subscribe(n => {
        this.ngRedux.dispatch({
          type: BreedActions.BREED_DELETED,
          payload: n
        });
      });
  };

  deleteAll = () => {
    this.breeds.deleteAll()
      .subscribe(
      cat => {
        this.ngRedux.dispatch({ type: BreedActions.BREED_DELETED, payload: cat });
      },
      err => console.error(`err: ${err} `));

  };
  submit = (breed) => {
    if (!breed.id) {
      this.createBreed(breed);
    } else {
      this.updateBreed(breed);
    }
  };

  updateBreed = (breed) => {
    this.breeds.update(breed).subscribe(result => {
      this.ngRedux
        .dispatch({
          type: BreedActions.BREED_UPDATED,
          payload: result,
        });
    });
  };

  createBreed = ({id, label}) => {
    // for now, to avoid image uploading / etc, just pick a random 
    // kitty cat from placeKitten - meow!
    
    this.breeds
      .create({ id, label })
      .subscribe(result => {
        this.ngRedux
          .dispatch({
            type: BreedActions.BREED_CREATED,
            payload: result,
          });
      });
  };
}
