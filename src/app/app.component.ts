import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { ICat } from './store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app works!';
  @select() cats$: Observable<ICat[]>;
  cats: any[];
  constructor() {
  }

  ngOnInit() {
  }
}
