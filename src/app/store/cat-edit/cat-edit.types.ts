import { ICat } from '../cats';

export interface ICatEdit  {
  isEditing: boolean;
  isPending: boolean;
  currentCat: ICat;
};
