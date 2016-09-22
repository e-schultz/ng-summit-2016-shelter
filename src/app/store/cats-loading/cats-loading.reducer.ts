import { CatActions } from '../cats/cat.actions';
import { ICatsLoading } from './cats-loading.types';

export const catsLoading = (state: ICatsLoading = false, action) => {
  switch (action.type) {
    case CatActions.CATS_LOADING:
      return true;
    case CatActions.CATS_LOADED:
      return false;
    case CatActions.CATS_LOADING_ERROR:
      return false;
    default:
      return state;
  }
};
