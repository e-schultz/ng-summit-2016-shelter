import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../../store';
@Injectable()
export class FilterActions {
  static FILTER_ADDED = 'FILTER_ADDED';
  static FILTER_REMOVED = 'FILTER_REMOVED';
  static CLEAR_FILTERS = 'CLEAR_FILTERS';

  constructor(private ngRedux: NgRedux<IAppState>) {

  }

  addFilter = (property,  value) => {
    this.ngRedux.dispatch({type: FilterActions.FILTER_ADDED, payload: { property, value }});
  };

  removeFilter = (property,  value) => {
    this.ngRedux.dispatch({type: FilterActions.FILTER_REMOVED, payload: { property, value }});
  };

  clearFilters = () => {
    this.ngRedux.dispatch({type: FilterActions.CLEAR_FILTERS});
  };

};
