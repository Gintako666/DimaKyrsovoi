type TransactionStatus = 'Paid' | 'Pending' | 'Rejected';

export interface Transaction {
  id: number,
  img: string,
  type: string,
  status: TransactionStatus,
  amount: number,
  category: {
    type: string,
    name: string
  },
  name: string,
  bank: string,
}
