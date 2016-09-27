import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cat-filter-list',
  templateUrl: './cat-filter-list.component.html',
  styleUrls: ['./cat-filter-list.component.scss']
})
export class CatFilterListComponent implements OnInit {

  @Input() filterProperty: string;
  @Input() activeFilters: any;
  @Input() filterGroup: any;
  @Output() filterChange: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {

  }

  toggleFilter(property, id, {checked} ) {
    this.filterChange.emit({
      property, id, checked
    });
  }

}
