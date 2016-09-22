import { ICodeTable } from './code-table.types';

export const INITIAL_STATE: ICodeTable = [{
  value: 'male',
  label: 'Male'
}, {
  value: 'female',
  label: 'Female'
}];


export const genders = (state= INITIAL_STATE, action) => {
  return state;
};

