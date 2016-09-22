interface IFilter {
  [key: string]: boolean;
}

interface IFilters {
  age: IFilter;
  breed: IFilter;
  gender: IFilter;
};

export { IFilter, IFilters };
