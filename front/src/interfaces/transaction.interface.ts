type TypeTransactionStatus = 'Paid' | 'Pending' | 'Rejected';

export interface ITransaction {
  id: number,
  img: string,
  type: string,
  status: TypeTransactionStatus,
  amount: number,
  category: {
    type: string,
    name: string
  },
  name: string,
  bank: string,
}
