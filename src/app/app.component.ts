import { Component, OnInit, ViewChild } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { ICat, CatsActions, FilterActions } from './store';
import { HorizonService } from './shared';
import { MdSidenav } from '@angular2-material/sidenav';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
const R = require('ramda');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CatsActions, FilterActions],

})
export class AppComponent implements OnInit {
  title = 'app works!';
  cat: any;
  bob = true;
  @select() codeTables$: Observable<any>;
  @select() cats$: Observable<ICat[]>;
  @select(['catEdit', 'currentCat']) catEdit$: Observable<any>;
  @select(['catEdit', 'isEditing'])  isEditing$: Observable<any>;
  @select() filters$;
  public filteredCats$;
  @select(['codeTables', 'breeds']) catBreeds$;
  @select(['codeTables', 'ages']) catAges$;
  @select(['codeTables', 'genders']) catGenders$;
  @ViewChild('end') endNav: MdSidenav;
  constructor(private catsActions: CatsActions, private horizonService: HorizonService, private filterActions: FilterActions) {

  }
  activeFilter(property, value) {
    console.log('oh hai active', property, value);
    return false;
  }
  toggleFilter(property, value, {checked}) {
    if (checked) {
      this.filterActions.addFilter(property, value);
    } else {
      this.filterActions.removeFilter(property, value);
    }

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

    this.filters$.subscribe(n => {
      console.log('hi filters', n);
    });
    this.catsActions.listAll();
    this.filteredCats$ = this.cats$.combineLatest(this.filters$,
    ( cats, filters: any ) => {
       let getSelected = R.pipe(R.toPairs, R.filter(filterPair => filterPair[1]), R.map(filterPair => filterPair[0]));
       let breed = getSelected(filters.breed);
       let age = getSelected(filters.age);
       let gender = getSelected(filters.gender);
       let filterPredicate = (prop, filter) => (cat) => filter.length === 0 || filter.indexOf(cat[prop]) >= 0;
       let breedFilter = filterPredicate('breed', breed);
       let ageFilter = filterPredicate('age', age);
       let genderFilter = filterPredicate('gender', gender);
       return cats.filter(R.allPass([breedFilter, ageFilter, genderFilter]));
    });
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
