import axiosInstance from './axiosInstance';

const PATH = '/items/transaction';

const TransactionsService = {
  async getTransactions() {
    return axiosInstance(PATH);
  },
};

export default TransactionsService;
