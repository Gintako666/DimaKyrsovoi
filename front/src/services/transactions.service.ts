import axiosInstance from './axiosInstance';

const PATH = '/items/transaction';

const TransactionsService = {
  async getTransactions(searchParams: string) {
    return axiosInstance(PATH + searchParams);
  },
};

export default TransactionsService;
