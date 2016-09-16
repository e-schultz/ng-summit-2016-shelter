import { combineReducers } from 'redux';
import { cats, ICat, catsLoading } from './cats';
import { catEdit } from './cat-edit';
import { codeTables } from './code-tables';
import { filters } from './filters';
export { ICat } from './cats';

export interface IAppState {
  cats?: ICat[];
  catEdit?: ICat;
  codeTables?: any;
  filters?: any;
  catsLoading?: boolean;
};

export const rootReducer = combineReducers<IAppState>({ cats, catEdit, codeTables, filters, catsLoading });

