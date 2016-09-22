import { ICodeTable } from './code-table.types';

export const INITIAL_STATE: ICodeTable = [
  { value: 'munchkin', label: 'Munchkin', },
  { value: 'domesticShort', label: 'Domestic Short', },
  { value: 'domesticLong', label: 'Domestic Long'}];

export const breeds = (state= INITIAL_STATE, action) => {
  return state;
};

