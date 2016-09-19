import { CatActions } from './cat.actions';

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
    case CatActions.CAT_DELETED:
      return state.filter(n => n.id !== action.payload.id);
    case CatActions.CATS_DELETED:
      return [];
    case CatActions.CATS_LOADED:
      return [...action.payload];
    case CatActions.CAT_CREATED:
      return [...state, action.payload];
    case CatActions.CAT_UPDATED:
    return state.map(n => {
      return n.id !== action.payload.id ? n : Object.assign({}, n, action.payload);
    });
    default:
      return state;
  }

};

