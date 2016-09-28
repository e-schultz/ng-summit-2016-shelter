import { Component, OnInit, ViewChild } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { ICat, CatActions } from './store';
import { MdSidenav } from '@angular2-material/sidenav';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import { filterCheck } from './store';
import { catBreeds, catAges, catGenders } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CatActions]

})
export class AppComponent implements OnInit {

  @select() codeTables$: Observable<any>;
  @select() cats$: Observable<ICat[]>;
  @select(['catEdit', 'currentCat']) catEdit$: Observable<any>;
  @select(['catEdit', 'isEditing']) isEditing$: Observable<any>;
  @select(['catEdit', 'isPending']) isPending$: Observable<any>;
  @select() filters$;
  public filteredCats$;
  @select() catsLoading$: Observable<boolean>;
  @select(catBreeds) catBreeds$;
  @select(catAges) catAges$;
  @select(catGenders) catGenders$;
  @ViewChild('end') endNav: MdSidenav;
  constructor(private catActions: CatActions) {

  }

  clearCat() {
    this.catActions.clearSelectedCat();
  }

  displayCat(cat) {
    this.catActions.selectCat(cat);
  }

  ngOnInit() {

    this.catActions.listAll();

    this.isEditing$.filter(n => n).subscribe(n => {
      // If we try to open while it's currently going through a transition
      // material will throw an error
      // need better way to keep this in sync based on state
      if (!this.endNav.opened) {
        this.endNav.open().catch(e => console.log('error', e));
      }
    });

     this.isEditing$.filter(n => !n).subscribe(n => {
       // If we try to open while it's currently going through a transition
      // material will throw an error
      // need better way to keep this in sync based on state

      if (this.endNav.opened) {
        this.endNav.close().catch(e => console.log('error', e));
      }
    });



    this.filteredCats$ = this.cats$
      .combineLatest(this.filters$.map(filterCheck),
      (cats, filters: any) => cats.filter(filters)
      );
  }


  displayAddCat() {
    this.catActions.selectCat({
      id: 'new'
    });
  }

  submitCat(catModel) {
    this.catActions.submitCat(catModel);
  }
  clearAllCats() {
    this.catActions.deleteAllCats();
  }
  populateCats() {
    this.catActions.populateCats();

  }
  deleteCat(cat) {
    this.catActions.deleteCat(cat);
  }
}
