import { generateId, randomRange } from '../../shared';
import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';
import { CatsService } from '../../shared';
@Injectable()
export class CatsActions {
  static CAT_CREATED = 'CAT_CREATED';
  constructor(private ngRedux: NgRedux<IAppState>, private cats: CatsService) { };

  createCat = ({name, headline, description}) => {

    // for now, to avoid image uploading / etc, just pick a random 
    // kitty cat from placeKitten - meow!
    const randomImage = randomRange(100, 200);
    const url = `https://placekitten.com/${randomImage}/${randomImage}`;
    const id = generateId();
    const images = [{ url }];

    this.cats
      .createCat({name, description, headline, images})
      .subscribe(result => {
        this.ngRedux
        .dispatch({
          type: CatsActions.CAT_CREATED,
          payload: result,
        });
      });
  };
}
