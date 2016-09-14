import { ICat } from '../cats';

interface ICatEdit  {
  isEditing: boolean;
  currentCat: ICat;
}
const INITIAL_STATE: ICatEdit = {
  isEditing: false,
  currentCat: null,
};

export const catEdit = (state= INITIAL_STATE, action) => {

  switch (action.type) {
    case 'CAT_SELECTED':
      return Object.assign({}, state,  action.payload );
    case 'CAT_CLEARED':
      return INITIAL_STATE;
    default:
     return state;
  }
};
