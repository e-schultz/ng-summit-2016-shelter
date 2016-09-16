import { Injectable } from '@angular/core';
import { HorizonService } from './horizon.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import { ResourceService } from './resource.service';
@Injectable()
export class AgesService extends ResourceService<any> {
  
  constructor(horizonService: HorizonService) {
    super(horizonService, 'ages');
  }
};
