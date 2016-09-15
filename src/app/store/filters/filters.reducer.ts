import { FilterActions } from './filter.actions';
import { combineReducers } from 'redux';
import { getIn } from '../../shared';
const R = require('ramda');
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
let count = 0;
export const activeFilters = (filters) => {
  console.log('hitting this',++count);
  const getSelected = R.pipe(R.toPairs, R.filter(filterPair => filterPair[1]), R.map(filterPair => filterPair[0]));
  const selectedBreed = getSelected(filters.breed);
  const selectedAge = getSelected(filters.age);
  const selectedGender = getSelected(filters.gender);
  const filterPredicate = (prop, filter) => (cat) => filter.length === 0 || filter.indexOf(cat[prop]) >= 0;
  const breedFilter = filterPredicate('breed', selectedBreed);
  const ageFilter = filterPredicate('age', selectedAge);
  const genderFilter = filterPredicate('gender', selectedGender);
  return R.allPass([breedFilter,ageFilter,genderFilter]);
};


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
