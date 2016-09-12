import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs';
import { ICat, IAppState, CatsActions } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CatsActions]
})
export class AppComponent implements OnInit{
  title = 'app works!';
  @select() cats$: Observable<ICat[]>;
  constructor(private catsActions: CatsActions) {
  }

  ngOnInit() {
  }
  createCat(catModel: any, isValid: boolean) {
    
    this.catsActions.createCat(catModel);
  }
}
