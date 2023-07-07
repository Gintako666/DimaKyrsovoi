export interface Transaction {
  name: string | null,
  type: string | null,
  currency: string,
  value: number,
  status: 'Paid' | 'Pending' | 'Rejected' | null,
  bank: string | null,
  category: string | null,
  date: string,
}