import { Injectable } from '@angular/core';
declare var Horizon: any;
@Injectable()
export class HorizonService {
  public horizon:any;
  constructor() {
    this.horizon = Horizon({ host: '127.0.0.1:8181'});
  }
  
  //status: {} | Boolean = false;

  /*connect() {
    this.horizon = Horizon({ host: '127.0.0.1:8181'});
    return new Promise((resolve, reject) => {
      this.horizon.onReady((status) => {
        this.status = status;
        resolve(status);
      });
      this.horizon.connect();
    });
  }*/
}
