import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { select, NgRedux } from 'ng2-redux';
import { Observable } from 'rxjs';
import { ICat, IAppState, CatsActions } from './store';
import { HorizonService } from './shared';
import { MdSidenav } from '@angular2-material/sidenav';
import 'rxjs/add/operator/filter';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CatsActions],

})
export class AppComponent implements OnInit {
  title = 'app works!';
  cat: any;
  @select() cats$: Observable<ICat[]>;
  @select(['catEdit','currentCat']) catEdit$: Observable<any>;
  @select(['catEdit','isEditing'])  isEditing$:Observable<any>;
  @ViewChild('end') endNav: MdSidenav;
  constructor(private catsActions: CatsActions, private horizonService: HorizonService) {

  }

  clearCat() {
    this.catsActions.clearSelectedCat();
  }
  displayCat(cat) {
    this.catsActions.selectCat(cat);
  }
  ngOnInit() {
    this.isEditing$.filter(n => n).subscribe(n => {
      this.endNav.open();
    });
    this.catsActions.listAll();
  }


  displayAddCat() {
    this.catsActions.selectCat({});
  }

  submitCat(catModel) {
    this.catsActions.submitCat(catModel);
  }
  clearAllCats() {
    this.catsActions.deleteAllCats();
  }
  populateCats() {
    this.catsActions.populateCats();

  }
  deleteCat(cat) {
    this.catsActions.deleteCat(cat);
  }
}
