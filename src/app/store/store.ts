import { combineReducers } from 'redux';
import { cats, ICat } from './cats';
import { catsLoading } from './cats-loading';
import { catEdit } from './cat-edit';
import { codeTables } from './code-tables';
import { filters } from './filters';
const  createLogger = require('redux-logger');

export interface IAppState {
  cats?: ICat[];
  catEdit?: ICat;
  codeTables?: any;
  filters?: any;
  catsLoading?: boolean;
};

export const middleware = [createLogger({level:'info', collapse: true })];
export const rootReducer = combineReducers<IAppState>({ cats, catEdit, codeTables, filters, catsLoading });

