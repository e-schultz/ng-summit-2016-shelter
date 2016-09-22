import { ages } from './ages.reducer';
import { breeds } from './breeds.reducer';
import { genders } from './genders.reducer';
import { combineReducers } from 'redux';
import { ICodeTables } from './code-table.types';

export const codeTables = combineReducers<ICodeTables>({ ages, breeds, genders });


