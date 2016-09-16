import { Injectable } from '@angular/core';
import { HorizonService } from './horizon.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

@Injectable()
export abstract class ResourceService<T> {
  private collection: any;
  constructor(horizonService: HorizonService, collectionName: string) {
    this.collection = horizonService.horizon(collectionName);
  }

  delete(id) {
    return this.collection.remove({ id });
  }

  listAll() {
    return this.collection.fetch();
  }

  deleteAll() {
    return this.listAll()
      .mergeMap(n => this.collection.removeAll(n));
  }

  create(item: T) {
    return this.collection
      .store(item)
      .mergeMap(n => this.collection.find({ id: n.id }).fetch());
  }


  update(item: T) {
    return this.collection
      .store(item)
      .mergeMap(n => this.collection.find({ id: n.id }).fetch());
  }
};
