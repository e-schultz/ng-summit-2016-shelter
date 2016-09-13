import { ICat } from '../cats';

interface ICatEdit extends ICat {
  isEditing: boolean;
}
const INITIAL_STATE: ICatEdit = {
  id: null,
  name: null,
  headline: null
  description: null,
  imageUrl: null,
  isEditing: false,
};

export const catEdit = (state= INITIAL_STATE, action) => {
  
  switch (action.type) {
    case 'CAT_SELECTED':
      return Object.assign({}, state, action.payload);
    case 'CAT_CLEARED':
      return INITIAL_STATE;
    default:
     return state;
  }
};
