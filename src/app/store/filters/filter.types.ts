declare  interface IFilter {
  [key: string]: boolean;
}

declare interface IFilters {
  age: IFilter;
  breed: IFilter;
  gender: IFilter;
};

export { IFilter, IFilters };