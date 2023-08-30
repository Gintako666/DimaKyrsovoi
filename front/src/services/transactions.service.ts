/* eslint-disable @typescript-eslint/no-explicit-any */
import { directus } from '~/contexts/user';
import { DataToChart, PieChartData } from '~/interfaces/chart.interface';
import { ITransaction } from '~/interfaces/transaction.interface';

const PATH = 'transaction';

const TransactionsService = {
  async getTransactions(searchParams?: any) {
    const result = directus.items(PATH).readByQuery({
      fields: [ '*', 'category.*', 'file.*' ],
      ...searchParams,
    });

    return result as Promise<{ data: ITransaction[] }>;
  },

  async editCategoryInTransaction(id: number, newCategory: number | null) {
    try {
      await directus.items(PATH).updateOne(id, {
        category: newCategory,
      });
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
    }
  },

  async getTransactionSummary() {
    const transactionSummary = (await directus.transport.get('/transaction_summary')).raw;

    return transactionSummary as Promise<{
      outgoingTotal: number,
      incomingTotal: number,
      monthlyData: DataToChart,
      categoriesPerMonthOutgoing: PieChartData,
      categoriesPerMonthIncoming:PieChartData,
    }>;
  },
};

export default TransactionsService;
