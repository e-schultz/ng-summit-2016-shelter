import { Injectable } from '@angular/core';
declare var Horizon: any;
@Injectable()
export class HorizonService {
  public horizon: any;
  constructor() {
    this.horizon = Horizon({ host: '127.0.0.1:8181'});
  }

}
