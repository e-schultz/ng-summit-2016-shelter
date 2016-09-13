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
  @select() catEdit$: Observable<any>;
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
    this.catEdit$.filter(n => n.isEditing === true).subscribe(n => {
      this.endNav.open();
    });
    this.catsActions.listAll();
  }
  createCat(catModel: any, isValid: boolean) {
    this.catsActions.createCat(catModel);
  }

  displayAddCat() {
    this.catsActions.selectCat();
  }

  updateCat(catModel) {
    this.catsActions.updateCat(catModel);
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
