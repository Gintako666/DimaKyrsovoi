import { FC, useCallback } from 'react';

import { ITransaction } from '~/interfaces/transaction.interface';
import { ICategory } from '~/interfaces/category.interface';
import TransactionsService from '~/services/transactions.service';
import Item from './Item';

interface ITransactionsTableItemsProps {
  transactions: ITransaction[];
  categories: ICategory[]
}

const TransactionsTableItems: FC<ITransactionsTableItemsProps> = ({ transactions, categories }) => {
  const { editCategoryInTransaction } = TransactionsService;
  const hendleChangeCategory = useCallback(async (
    transactionId: number,
    newCategory: number | null,
  ) => {
    await editCategoryInTransaction(transactionId, newCategory);

    return newCategory;
  }, [ editCategoryInTransaction ]);

  const items = transactions.map((transaction) => {
    const { id, category } = transaction;

    return (
      <Item
        key={ id }
        transaction={ transaction }
        category={ category }
        categories={ categories }
        hendleChangeCategory={ hendleChangeCategory }
      />
    );
  });

  return <div>{items}</div>;
};

export default TransactionsTableItems;
