import { combineReducers } from 'redux';
import { cats, ICat } from './cats';
import { catEdit } from './cat-edit';
import { codeTables } from './code-tables';
import { filters } from './filters';
export { ICat } from './cats';

export interface IAppState {
  cats?: ICat[];
  catEdit?: ICat;
  codeTables?: any;
  filters?: any;
};

export const rootReducer = combineReducers<IAppState>({ cats, catEdit, codeTables, filters });

