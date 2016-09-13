import { Injectable } from '@angular/core';
import { HorizonService } from './horizon.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

@Injectable()
export class CatsService {
  private cats: any;
  constructor(horizonService: HorizonService) {
    this.cats = horizonService.horizon('cats');
  }

  deleteCat(id) {
    return this.cats.remove({id});
  }
  
  listAll() {
    return this.cats.fetch();
  }
  
  deleteAllCats() {
    return this.listAll()
      .mergeMap(n => this.cats.removeAll(n));
  }

  createCat(cat) {
    return this.cats
      .store(cat)
      .mergeMap(n => this.cats.find({ id: n.id }).fetch());
  }
};
