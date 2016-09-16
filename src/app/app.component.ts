import { Component, OnInit, ViewChild } from '@angular/core';
import { select } from 'ng2-redux';
import { Observable } from 'rxjs';
import { ICat, CatsActions, FilterActions } from './store';
import { HorizonService } from './shared';
import { MdSidenav } from '@angular2-material/sidenav';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/combineLatest';
const R = require('ramda');
import { activeFilters } from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CatsActions, FilterActions]

})
export class AppComponent implements OnInit {
  title = 'app works!';
  cat: any;
  bob = true;
  @select() codeTables$: Observable<any>;
  @select() cats$: Observable<ICat[]> 
  @select(['catEdit', 'currentCat']) catEdit$: Observable<any>;
  @select(['catEdit', 'isEditing']) isEditing$: Observable<any>;
  @select() filters$;
  public filteredCats$;
  @select() catsLoading$:Observable<boolean>;
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

    this.catsActions.listAll();
    
    this.cats$.map(cats=>{
      return cats.map(cat=>Object.assign({},cat,{name: cat.name.toUpperCase()}))
    }).subscribe(n=>{
      console.log('loud cats!',n);
    })
    this.filteredCats$ = this.cats$
      .combineLatest(this.filters$.map(activeFilters),
      (cats, filters: any) => cats.filter(filters)
      );
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
