import { CatActions } from '../cats';
import { ICatEdit } from './cat-edit.types';
import { INITIAL_STATE } from './cat-edit.initial-state';

let setPending = (state, isPending) => Object.assign({}, state, { isPending });

let { CAT_SELECTED,
  CAT_CLEARED,
  UPDATING_CAT,
  CREATING_CAT,
  CAT_CREATED,
  CAT_UPDATED,
  CAT_UPDATE_ERROR,
  CAT_CREATE_ERROR } = CatActions;

export const catEdit = (state:ICatEdit = INITIAL_STATE, action) => {

  switch (action.type) {
    case CAT_SELECTED:
      return Object.assign({},
        state,
        { isEditing: true },
        action.payload);
    case CAT_CLEARED:
      return INITIAL_STATE;
    case UPDATING_CAT:
    case CREATING_CAT:
      return setPending(state, true);
    case CAT_CREATED:
    case CAT_UPDATED:
    case CAT_UPDATE_ERROR:
    case CAT_CREATE_ERROR:
      return setPending(state, false);
    default:
      return state;
  }
};
