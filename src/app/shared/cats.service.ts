import { Injectable } from '@angular/core';
import { HorizonService } from './horizon.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { ResourceService } from './resource.service';
import { ICat } from '../store';
@Injectable()
export class CatsService extends ResourceService<ICat> {

  constructor(horizonService:   HorizonService) {
    super(horizonService, 'cats');
  }
};
