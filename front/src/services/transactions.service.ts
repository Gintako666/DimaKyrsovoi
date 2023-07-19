import { directus } from '~/contexts/user';

const PATH = 'transaction';

const TransactionsService = {
  async getTransactions(searchParams?: any) {
    return directus.items(PATH).readByQuery({
      fields: [ '*', 'category.*', 'file.*' ],
      ...searchParams,
    });
  },

  async editCategoryInTransaction(id: number, newCategory: number | null) {
    try {
      directus.items(PATH).updateOne(id, {
        category: newCategory,
      });
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
    }
  },

  async getTransactionSummary() {
    const transactionSummary = (await directus.transport.get('/transaction_summary')).raw;

    return {
      data: transactionSummary,
    };
  },
};

export default TransactionsService;
