import React, { FC } from 'react';

import useFetchData from '~/hooks/useFetchData';

import CategoriesService from '~/services/categories.service';

import { ITransaction } from '~/interfaces/transaction.interface';
import { ICategory } from '~/interfaces/category.interface';
import Item from './Item';

interface ITransactionsTableItemsProps {
  transactions: ITransaction[];
}

const TransactionsTableItems: FC<ITransactionsTableItemsProps> = ({ transactions }) => {
  const { getCategories } = CategoriesService;
  const { data } = useFetchData(getCategories);

  const categoryItems: ICategory[] = data?.data;

  const items = transactions.map((transaction) => {
    const { id, category } = transaction;
    const categoryItem = categoryItems?.find((item: ICategory) => item.id === category);

    return <Item key={ id } transaction={ transaction } category={ categoryItem } />;
  });

  return <div>{items}</div>;
};

export default TransactionsTableItems;
