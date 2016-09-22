import { combineReducers } from 'redux';
import { cats, ICat } from './cats';
import { catsLoading } from './cats-loading';
import { catEdit } from './cat-edit';
import { codeTables, ICodeTables } from './code-tables';
import { filters, IFilters } from './filters';
const  createLogger = require('redux-logger');

export interface IAppState {
  cats?: ICat[];
  catEdit?: ICat;
  codeTables?: ICodeTables;
  filters?: IFilters;
  catsLoading?: boolean;
};

export const middleware = [createLogger({level:'info', collapse: true })];
export const rootReducer = combineReducers<IAppState>({ cats, catEdit, codeTables, filters, catsLoading });

