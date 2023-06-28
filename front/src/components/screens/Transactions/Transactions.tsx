import React, {
  FC, useEffect, useState,
} from 'react';
import { ITransaction } from '~/interfaces/transaction.interface';
import Loader from '~/components/shared/Loader/Loader';
import Title from '~/components/shared/Title/Title';
import { useRouter } from 'next/router';
import transactionsFromApi from './transactions.json';
import TransactionsTableItem from './TransactionsTableItem/TransactionsTableItem';

const Transactions: FC = React.memo(() => {
  const [ transactions, setTransactions ] = useState<ITransaction[] | null>(null);
  // Пока нету апи используем renderTransactions, после будем использовать transactions для рендера
  const [ renderTransactions, setRenderTransactions ] = useState<ITransaction[]>([]);
  const [ selectFilter, setSelectFilter ] = useState('all');
  const router = useRouter();

  useEffect(() => {
    // Запрос на сервер
    setTimeout(
      () => {
        setTransactions(transactionsFromApi as ITransaction[]);
      },
      500,
    );
  }, [ selectFilter ]);

  // Убираем после того как будет апи
  useEffect(() => {
    if (transactions) {
      if (selectFilter !== 'all') {
        setRenderTransactions(transactions
          .filter((transaction) => (
            transaction.status === selectFilter
            || transaction.type === selectFilter
          )));
      } else {
        setRenderTransactions(transactions);
      }
    }
  }, [ selectFilter, transactions ]);

  if (!transactions) {
    return <Loader />;
  }

  return (
    <section className="transactions">
      <div className="transactions__container">
        <header className="transactions__header">
          <Title
            className="transactions"
            modifier="large"
            title="Latest transactions"
            text="Transaction lorem ipsum dolor sit amet dolor sit transaction description dummy text and so on and so on..."
          />

          <div className="transactions__header__filter">
            <h4>Filter category:</h4>
            <select
              name=""
              id=""
              className="transactions__header__filter__select"
              onChange={ (e) => {
                const { value } = e.target;
                setSelectFilter(value);

                router.push({
                  query: value !== 'all' ? { filter: value } : {},
                });
              } }
            >
              <option
                className="transactions__header__filter__option"
                value="all"
              >
                All

              </option>
              <option
                className="transactions__header__filter__option"
                value="Paid"
              >
                Paid

              </option>
              <option
                className="transactions__header__filter__option"
                value="Pending"
              >
                Pending

              </option>
              <option
                className="transactions__header__filter__option"
                value="Rejected"
              >
                Rejected

              </option>
              <option
                className="transactions__header__filter__option"
                value="Bank transaction"
              >
                Bank transaction

              </option>
              <option
                className="transactions__header__filter__option"
                value="Credit card"
              >
                Credit card

              </option>
            </select>
          </div>
        </header>
        <div className="transactions__table">
          <div className="transactions__table__header">
            <div className="transactions__table__header__item">transactions</div>
            <div className="transactions__table__header__item">category</div>
            <div className="transactions__table__header__item">type</div>
            <div className="transactions__table__header__item">status</div>
            <div className="transactions__table__header__item">amount</div>
          </div>
          {renderTransactions
            .map((transaction) => (
              <TransactionsTableItem
                key={ transaction.id }
                transaction={ transaction }
              />
            ))}
        </div>

      </div>
    </section>
  );
});

export default Transactions;
