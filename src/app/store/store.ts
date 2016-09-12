import { combineReducers } from 'redux';
import { cats, ICat } from './cats';
export { ICat } from './cats';

export interface IAppState {
  cats?: ICat[];
};

export const rootReducer = combineReducers<IAppState>({ cats });

