import {
  Directus, IAuth, TypeMap,
} from '@directus/sdk';
import { useCallback } from 'react';
import { useUser } from '~/contexts/user';
import { ICategory } from '~/interfaces/category.interface';
import { Dataset, PieChartData } from '~/interfaces/chart.interface';
import { ITransaction } from '~/interfaces/transaction.interface';

const useDirectusApi = () => {
  const user: {
    directus: Directus<TypeMap, IAuth>
  } = useUser();
  const getCategories = useCallback(async (
    withUncategorized = false,
  ): Promise<{ data: ICategory[] }> => {
    const categories = await user.directus.items('category').readByQuery({
      fields: '*',
    });

    if (withUncategorized) {
      categories.data?.push({
        name: 'Uncategorized',
        id: 0,
        color: '#636363',
        transactions: [],
      });
    }

    return categories as { data: ICategory[] };
  }, [ user.directus ]);

  const addCategory = useCallback(async (category: Pick<ICategory, 'name' | 'color'>) => {
    const newCategory = await user.directus.items('category').createOne(category);
    return newCategory;
  }, [ user.directus ]);

  const deleteCategory = useCallback(async (id: ICategory['id']) => {
    await user.directus.items('category').deleteOne(id);
  }, [ user.directus ]);

  const editCategory = useCallback(async (editedCategory: ICategory) => {
    const { id } = editedCategory;
    const updateCategory = await user.directus.items('category').updateOne(id, editedCategory);
    return updateCategory;
  }, [ user.directus ]);

  const getTransactions = useCallback(async (
    filter?: { filter: any },
  ): Promise<{ data: ITransaction[] }> => {
    const transactions = await user.directus.items('transaction').readByQuery({
      fields: [ '*', 'category.*' ],
      sort: 'date',
      ...filter,
    });

    return transactions as { data: ITransaction[] };
  }, [ user.directus ]);

  const editCategoryInTransaction = useCallback(async (id: number, newCategory: number | null) => {
    const updateCategory = await user.directus.items('transaction').updateOne(id, { category: newCategory });
    return updateCategory;
  }, [ user.directus ]);

  const getTransactionSummary = useCallback(async (): Promise<{
    categoriesPerMonthIncoming: PieChartData
    categoriesPerMonthOutgoing: PieChartData
    incomingTotal: number
    outgoingTotal: number
    monthlyData: Dataset[]
  }> => {
    const transactionSummary = (await user.directus.transport.get('/transaction_summary')).raw;
    return transactionSummary;
  }, [ user.directus.transport ]);

  const uploadFile = useCallback(async (file: FormData) => {
    await user.directus.transport.post('/upload', file);
  }, [ user.directus.transport ]);

  return {
    getTransactions,
    editCategoryInTransaction,

    getCategories,
    addCategory,
    editCategory,
    deleteCategory,

    getTransactionSummary,

    uploadFile,

  };
};

export default useDirectusApi;
