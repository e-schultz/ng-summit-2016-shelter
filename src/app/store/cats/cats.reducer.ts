import { CatActions } from './cat.actions';
import { ICats } from './cat.types';

const INITIAL_STATE: ICats = [];
const { CAT_CREATED, CAT_DELETED, CATS_DELETED, CATS_LOADED, CAT_UPDATED } = CatActions;

export const cats = (state: ICats = INITIAL_STATE, action) => {

  switch (action.type) {
    case CAT_DELETED:
      return state.filter(n => n.id !== action.payload.id);
    case CATS_DELETED:
      return [];
    case CATS_LOADED:
      return [...action.payload];
    case CAT_CREATED:
      return [...state, action.payload];
    case CAT_UPDATED:
    return state.map(n => {
      return n.id !== action.payload.id ? n : Object.assign({}, n, action.payload);
    });
    default:
      return state;
  }

};

