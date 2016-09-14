import { FilterActions } from './filter.actions';
import { combineReducers } from 'redux';
import { getIn } from '../../shared';

const filterReducer = (property, INITIAL_STATE = {}) => (state = INITIAL_STATE, action) => {
  if (getIn(action, ['payload', 'property']) !== property && action.type !== FilterActions.CLEAR_FILTERS) {
    return state;
  }
   switch (action.type) {
    case FilterActions.FILTER_ADDED:
      return Object.assign({}, state, {[action.payload.value]: true});
    case FilterActions.FILTER_REMOVED:
      return Object.assign({}, state, {[action.payload.value]: false});
    case FilterActions.CLEAR_FILTERS:
      return Object.assign({}, INITIAL_STATE);
   default:
    return state;
  }
};

const age = filterReducer('age');
const breed = filterReducer('breed');
const gender = filterReducer('gender');

/*
const age = (state = {}, action) => {

  if (getIn(action, ['payload', 'property']) !== 'age') {
    return state;
  }
   switch (action.type) {
    case FilterActions.FILTER_ADDED:
      return Object.assign({}, state, {[action.payload.value]: true});
  case FilterActions.FILTER_REMOVED:
    return Object.assign({}, state, {[action.payload.value]: false});
   default:
   return state;
  }
};

const breed = (state = {domesticLong:true}, action) => {
  if (getIn(action, ['payload', 'property']) !== 'breed') {
    return state;
  }
  switch (action.type) {
    case FilterActions.FILTER_ADDED:
      return Object.assign({}, state, {[action.payload.value]: true});
  case FilterActions.FILTER_REMOVED:
    return Object.assign({}, state, {[action.payload.value]: false});
   default:
   return state;
  }
};

const gender = (state = {}, action) => {
  if (getIn(action, ['payload', 'property']) === 'gender') {
    return state;
  }
  switch (action.type) {
    case FilterActions.FILTER_ADDED:
      return Object.assign({}, state, {[action.payload.value]: true});
  case FilterActions.FILTER_REMOVED:
    return Object.assign({}, state, {[action.payload.value]: false});
   default:
   return state;
  }
};*/

export const filters = combineReducers({age, breed, gender});
