interface ICat {
  id: string;
  name: string;
  headline: string;
  description: string;
  imageUrl: string;
  breed: string;
  age: string;
  gender: string;
};

interface ICats extends Array<ICat> { }

export { ICat, ICats };
