import useFetchData, { IUseFetchDataResult } from '~/hooks/useFetchData';

const path = '/items/transaction';

interface ITransactionsService {
  (): IUseFetchDataResult
}

const TransactionsService: ITransactionsService = () => useFetchData(path);

export default TransactionsService;
