import { ICodeTable } from './code-table.types';

const INITIAL_STATE: ICodeTable = [{
  id: 'male',
  label: 'Male'
}, {
  id: 'female',
  label: 'Female'
}];


export const genders = (state= INITIAL_STATE, action) => {
  return state;
};

