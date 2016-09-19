import { CatsActions } from '../cats/cats.actions';

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
