import { Injectable } from '@angular/core';
import { HorizonService } from './horizon.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { randomRange } from './';
const MIN_DELAY = 500;
const MAX_DELAY = 2500;

@Injectable()
export abstract class ResourceService<T> {
  private collection: any;

  constructor(horizonService: HorizonService, collectionName: string) {
    this.collection = horizonService.horizon(collectionName);
  }

  watch(options:{rawChanges: boolean} = {rawChanges: true}) {
    return this.collection.watch(options);
  }
  
  delete = (id) => {
    return this.collection.remove({ id })
    .delay(randomRange(MIN_DELAY, MAX_DELAY));
  }

  listAll = (): Observable<T>  => {
    return this.collection.fetch()
    .delay(randomRange(MIN_DELAY, MAX_DELAY));
  }

  deleteAll = () => {
    return this.listAll()
      .mergeMap(n => this.collection.removeAll(n))
      .delay(randomRange(MIN_DELAY, MAX_DELAY));
  }

  create = (item: T | T[]): Observable<T | T[]> => {
    return this.collection
      .store(item)
      .mergeMap(n => this.collection.find({ id: n.id }).fetch())
      .delay(randomRange(MIN_DELAY, MAX_DELAY));
  }


  update = (item: T): Observable<T>  => {
    return this.collection
      .store(item)
      .mergeMap(n => this.collection.find({ id: n.id }).fetch())
      .delay(randomRange(MIN_DELAY, MAX_DELAY));
  }
};
