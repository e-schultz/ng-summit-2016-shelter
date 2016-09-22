import { FilterActions } from './filter.actions';
import { combineReducers } from 'redux';
import { getIn } from '../../shared';

const createFilterReducer = (property, INITIAL_STATE = {}) => (state = INITIAL_STATE, action) => {
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

const age = createFilterReducer('age');
const breed = createFilterReducer('breed');
const gender = createFilterReducer('gender');

export const filters = combineReducers({ age, breed, gender });

/**
 * The shape of the filter state before applying this looks something like:
 * ```
 * {
 *   age: {
 *    senior: true
 *   }
 * }
 * ```
 * This function converts the state, into a function that can be used in an filter to remove
 * items that do not match.
 */
export const filterCheck = (filterState) => {

  const getSelected = R.pipe(R.toPairs, R.filter(filterPair => filterPair[1]), R.map(filterPair => filterPair[0]));
  const selectedBreed = getSelected(filterState.breed);
  const selectedAge = getSelected(filterState.age);
  const selectedGender = getSelected(filterState.gender);
  const filterPredicate = (prop, filter) => (cat) => filter.length === 0 || filter.indexOf(cat[prop]) >= 0;
  const breedFilter = filterPredicate('breed', selectedBreed);
  const ageFilter = filterPredicate('age', selectedAge);
  const genderFilter = filterPredicate('gender', selectedGender);
  return R.allPass([breedFilter, ageFilter, genderFilter]);
};

