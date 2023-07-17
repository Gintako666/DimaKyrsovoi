import { FC } from 'react';

import { ITransaction } from '~/interfaces/transaction.interface';
import { ICategory } from '~/interfaces/category.interface';
import Item from './Item';

interface ITransactionsTableItemsProps {
  transactions: ITransaction[];
  categorys: ICategory[]
}

const TransactionsTableItems: FC<ITransactionsTableItemsProps> = ({ transactions, categorys }) => {
  const items = transactions.map((transaction) => {
    const { id, category } = transaction;

    return (
      <Item
        key={ id }
        transaction={ transaction }
        category={ category }
        categorys={ categorys }
      />
    );
  });

  return <div>{items}</div>;
};

export default TransactionsTableItems;
