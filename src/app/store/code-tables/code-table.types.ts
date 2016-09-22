declare interface ICodeValue {
  value: string;
  label: string;
}

declare interface ICodeTable extends Array<ICodeValue> { }


declare interface ICodeTables {
  breeds: ICodeTable;
  ages: ICodeTable;
  genders: ICodeTable;
};

export { ICodeValue, ICodeTable, ICodeTables };
