import { combineReducers } from 'redux';
import { cats, ICats  } from './cats';
import { catsLoading, ICatsLoading } from './cats-loading';
import { catEdit, ICatEdit } from './cat-edit';
import { codeTables, ICodeTables } from './code-tables';
import { filters, IFilters } from './filters';
const  createLogger = require('redux-logger');

export interface IAppState {
  cats?: ICats;
  catEdit?: ICatEdit;
  codeTables?: ICodeTables;
  filters?: IFilters;
  catsLoading?: ICatsLoading;
};

export const middleware = [createLogger({level: 'info', collapse: true })];
export const rootReducer = combineReducers<IAppState>({ cats, catEdit, codeTables, filters, catsLoading });

