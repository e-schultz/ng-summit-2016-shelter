export interface ICodeValue {
  value: string;
  label: string;
}

export interface ICodeTable {
  [index: number]: ICodeValue;
};


export interface ICodeTables {
  breeds: ICodeTable;
  ages: ICodeTable;
  genders: ICodeTable;
};
