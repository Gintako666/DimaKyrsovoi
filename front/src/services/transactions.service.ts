import axiosInstance from './axiosInstance';

const path = '/items/transaction';

const TransactionsService = {
  async getTransactions() {
    return axiosInstance(path);
  },
};

export default TransactionsService;
