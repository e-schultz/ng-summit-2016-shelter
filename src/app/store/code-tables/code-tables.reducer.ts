import { ages } from './ages.reducer';
import { breeds } from './breeds.reducer';
import { genders } from './genders.reducer';
import { combineReducers } from 'redux';

export const codeTables = combineReducers({ ages, breeds, genders });

