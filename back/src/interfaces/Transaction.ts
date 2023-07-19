import { File } from './File';

export type StatusType = 'Paid' | 'Pending' | 'Rejected';

export interface Transaction {
  name: string | null,
  type: string | null,
  currency: string | null,
  value: number,
  status: StatusType | null,
  bank: string | null,
  category: string | null,
  date: string | Date | number,
  file: File
}
