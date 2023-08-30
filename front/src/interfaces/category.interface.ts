export interface ICategory {
  id: number;
  name: string;
  color: string;
  transactions: number[];
  parent_category: number | null
}

export interface ICategoryWithChildLength extends ICategory {
  childLength: number,
}
