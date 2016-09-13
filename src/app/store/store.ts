import { combineReducers } from 'redux';
import { cats, ICat } from './cats';
import { catEdit } from './cat-edit';
export { ICat } from './cats';

export interface IAppState {
  cats?: ICat[];
  catEdit?: ICat;
};

export const rootReducer = combineReducers<IAppState>({ cats, catEdit });

