interface ICodeValue {
  id: string;
  label: string;
}

interface ICodeTable extends Array<ICodeValue> { }


interface ICodeTables {
  breeds: ICodeTable;
  ages: ICodeTable;
  genders: ICodeTable;
};

export { ICodeValue, ICodeTable, ICodeTables };
