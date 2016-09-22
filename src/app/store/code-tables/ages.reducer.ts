import { ICodeTable } from './code-table.types';

export const INITIAL_STATE: ICodeTable = [{
  value: 'senior',
  label: 'Senior'
}, {
  value: 'kitten',
  label: 'Kitten'
},
{
  value: 'adult',
  label: 'Adult'
}];


export const ages = (state= INITIAL_STATE, action) => {
  return state;
};

