import useFetchData, { IUseFetchDataResult } from '~/hooks/useFetchData';

interface ITransactionsService {
  (): IUseFetchDataResult
}

const TransactionsService: ITransactionsService = () => useFetchData('/items/transaction');

export default TransactionsService;
