import { Component, OnInit } from '@angular/core';
import { select } from 'ng2-redux';
import { ICat, FilterActions } from '../../store';
import { catBreeds, catAges, catGenders } from '../../store';

@Component({
  selector: 'app-cat-filter-container',
  templateUrl: './cat-filter-container.component.html',
  styleUrls: ['./cat-filter-container.component.scss'],
  providers: [FilterActions]
})
export class CatFilterContainerComponent implements OnInit {

  @select(catBreeds) catBreeds$;
  @select(catAges) catAges$;
  @select(catGenders) catGenders$;
  @select() filters$;

  constructor(private filterActions: FilterActions) { }

  toggleFilter({property, id, checked}) {
    if (checked) {
         this.filterActions.addFilter(property, id);
    } else {
        this.filterActions.removeFilter(property, id);
    }

  }
  ngOnInit() { }

}
