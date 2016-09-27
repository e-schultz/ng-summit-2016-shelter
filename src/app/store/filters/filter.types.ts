import { Action } from 'redux';

interface IFilter {
  [key: string]: boolean;
}

interface IFilters {
  age: IFilter;
  breed: IFilter;
  gender: IFilter;
};

interface IFilterActionPayload {
  property: string;
  id: string;
};

interface IFilterAction extends Action {
  payload?: IFilterActionPayload;
}

export { IFilter, IFilters, IFilterActionPayload, IFilterAction };
