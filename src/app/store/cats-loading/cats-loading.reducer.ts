import { CatActions } from '../cats/cat.actions';

export const catsLoading = (state = false, action) => {
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
