import { ICat } from '../cats';

interface ICatEdit  {
  isEditing: boolean;
  isPending: boolean;
  currentCat: ICat;
}
const INITIAL_STATE: ICatEdit = {
  isEditing: false,
  currentCat: null,
  isPending: false,
};

let setPending = (state, isPending) => {
  return Object.assign({}, state, {isPending});
};
export const catEdit = (state= INITIAL_STATE, action) => {

  switch (action.type) {
    case 'CAT_SELECTED':
      return Object.assign({},
      state,
      { isEditing: true },
      action.payload );
    case 'CAT_CLEARED':
      return INITIAL_STATE;
  case 'UPDATING_CAT':
  case 'CREATING_CAT':
    return setPending(state, true);
  case 'CAT_CREATED':
  case 'CAT_UPDATED':
  case 'CAT_UPDATE_ERROR':
  case 'CAT_CREATE_ERROR':
    return setPending(state, false);
  default:
     return state;
  }
};
