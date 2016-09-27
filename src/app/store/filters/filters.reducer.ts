import { FilterActions } from './filter.actions';
import { combineReducers } from 'redux';
import { getIn } from '../../shared';
import { IFilters, IFilter } from './filter.types';

const { FILTER_ADDED, FILTER_REMOVED, CLEAR_FILTERS } = FilterActions;

function createFilterReducer(property, INITIAL_STATE: IFilter = {}) {
  return function filterReducer(state = INITIAL_STATE, action) {
    const id = getIn(action, ['payload', 'id']);
    const actionProperty = getIn(action, ['payload', 'property']);
    const type = action.type;

    if (actionProperty !== property && type !== CLEAR_FILTERS) {
      return state;
    }

    switch (type) {
      case FILTER_ADDED:
        return Object.assign({}, state, { [id]: true });
      case FILTER_REMOVED:
        return Object.assign({}, state, { [id]: false });
      case CLEAR_FILTERS:
        return Object.assign({}, INITIAL_STATE);
      default:
        return state;
    }
  };
}

const age = createFilterReducer('age');
const breed = createFilterReducer('breed');
const gender = createFilterReducer('gender');

export const filters = combineReducers<IFilters>({ age, breed, gender });


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


