import { Injectable } from '@angular/core';
import { HorizonService } from './horizon.service';
import 'rxjs/add/operator/mergeMap';

@Injectable()
export class CatsService {
  private cats: any;
  constructor(horizonService: HorizonService) {
    this.cats = horizonService.horizon('cats');
  }

  createCat(cat) {
    return this.cats
      .store(cat)
      .mergeMap(n => this.cats.find({id: n.id}).fetch());
  }
};
