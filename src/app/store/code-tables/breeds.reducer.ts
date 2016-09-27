import { ICodeTable } from './code-table.types';
import { BreedActions } from './breeds.actions';
export const INITIAL_STATE: ICodeTable = [
  { value: 'munchkin', label: 'Munchkin', },
  { value: 'domesticShort', label: 'Domestic Short', },
  { value: 'domesticLong', label: 'Domestic Long' }];

let { BREED_CREATED, BREED_UPDATED, BREED_DELETED } = BreedActions;

export const breeds = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case BREED_CREATED:
      return [...state, action.payload];
    case BREED_UPDATED:
      return state.map(n => {
        if (n.value === action.payload.value) {
          let result = Object.assign({}, n, { label: action.payload.label });
          console.log('result is!', result);
          return result;
        }
        else {
          return n;
        }

      });
    case BREED_DELETED:
      return state.filter(n => n.value === action.payload.value);

  }
  return state;
};

