import React, { FC } from 'react';

import { ITransaction } from '~/interfaces/transaction.interface';
import { ICategory } from '~/interfaces/category.interface';
import CategoriesService from '~/services/categories.service';
import Item from './Item';

interface ITransactionsTableItemsProps {
  transactions: ITransaction[];
}

const TransactionsTableItems: FC<ITransactionsTableItemsProps> = ({ transactions }) => {
  const { data } = CategoriesService();

  const categoryItems: ICategory[] = data?.data;

  const items = transactions.map((transaction) => {
    const { id, category } = transaction;
    const categoryItem = categoryItems?.find((item: ICategory) => item.id === category);

    return <Item key={ id } transaction={ transaction } category={ categoryItem } />;
  });

  return <div>{items}</div>;
};

export default TransactionsTableItems;
