import { CatsActions } from './cats.actions';

const INITIAL_STATE: ICat[] = [];

export interface ICat {
  id: string;
  name: string;
  headline: string;
  description: string;
  imageUrl: string;
  breed: string;
  age: string;
  gender: string;
}


export const cats = (state: ICat[] = INITIAL_STATE, action) => {
  switch (action.type) {
    case CatsActions.CAT_DELETED:
      return state.filter(n => n.id !== action.payload.id);
    case CatsActions.CATS_DELETED:
      return [];
    case CatsActions.CATS_LOADED:
      return [...action.payload];
    case CatsActions.CAT_CREATED:
      return [...state, action.payload];
    case CatsActions.CAT_UPDATED:
    return state.map(n => {
      return n.id !== action.payload.id ? n : Object.assign({}, n, action.payload);
    });
    default:
      return state;
  }

};


export const catsLoading = (state = false, action) => {
  switch (action.type) {
    case CatsActions.CATS_LOADING:
      return true;
    case CatsActions.CATS_LOADED:
      return false;
    case CatsActions.CATS_LOADING_ERROR:
      return false;
    default:
      return state;
  }
};
