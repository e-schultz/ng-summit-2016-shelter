import { CatsActions } from './cats.actions';

const INITIAL_STATE: ICat[] = [];

export interface ICat {
  id: string;
  name: string;
  headline: string;
  description: string;
  imageUrl: string;
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
    default:
      return state;
  }

};
