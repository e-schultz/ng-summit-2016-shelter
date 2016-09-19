import { Component, OnInit, ViewChild } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { ICat, CatActions, FilterActions } from './store';
import { HorizonService } from './shared';
import { MdSidenav } from '@angular2-material/sidenav';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
import { activeFilters } from './store';
import { catBreeds, catAges, catGenders } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CatActions, FilterActions]

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
  constructor(private catActions: CatActions, private horizonService: HorizonService, private filterActions: FilterActions) {

  }

  clearCat() {
    this.catActions.clearSelectedCat();
  }

  displayCat(cat) {
    this.catActions.selectCat(cat);
  }
  
  ngOnInit() {
    this.isEditing$.filter(n => n).subscribe(n => {
      this.endNav.open();
    });

    this.catActions.listAll();

    this.filteredCats$ = this.cats$
      .combineLatest(this.filters$.map(activeFilters),
      (cats, filters: any) => cats.filter(filters)
      );
  }


  displayAddCat() {
    this.catActions.selectCat({});
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
