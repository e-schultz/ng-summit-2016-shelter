import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';
import { IFilterAction } from './filter.types';

@Injectable()
export class FilterActions {
  static FILTER_ADDED = 'FILTER_ADDED';
  static FILTER_REMOVED = 'FILTER_REMOVED';
  static CLEAR_FILTERS = 'CLEAR_FILTERS';

  constructor(private ngRedux: NgRedux<IAppState>) {

  }

  addFilter = (property: string,  value: string) => {
    this.ngRedux.dispatch<IFilterAction>({type: FilterActions.FILTER_ADDED, payload: { property, value }});
  };

  removeFilter = (property: string,  value: string) => {
    this.ngRedux.dispatch<IFilterAction>({type: FilterActions.FILTER_REMOVED, payload: { property, value }});
  };

  clearFilters = () => {
    this.ngRedux.dispatch<IFilterAction>({type: FilterActions.CLEAR_FILTERS});
  };

};
