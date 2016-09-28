import { ICodeTable } from './code-table.types';

const INITIAL_STATE: ICodeTable = [{
  id: 'senior',
  label: 'Senior'
}, {
  id: 'kitten',
  label: 'Kitten'
},
{
  id: 'adult',
  label: 'Adult'
}];


export const ages = (state= INITIAL_STATE, action) => {
  return state;
};

