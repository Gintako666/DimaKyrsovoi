import { Transaction } from './Transaction';

export interface Category {
  id: number,
  name: string,
  transactions: Transaction[],
  color: string,
}
