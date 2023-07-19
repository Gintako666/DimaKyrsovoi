import { ICategory } from './category.interface';
import { IFile } from './file.interface';

export interface ITransaction {
  id: number;
  date: string;
  name: string;
  bank: string;
  currency: string;
  category: ICategory;
  value: string;
  type: string;
  status: string;
  file: IFile;
}
