import {
  FC, memo, useMemo, useState,
} from 'react';
import { useRouter } from 'next/router';

import Loader from '~/components/shared/Loader/Loader';
import Title from '~/components/shared/Title/Title';

import useFetchData from '~/hooks/useFetchData';

import CategoriesService from '~/services/categories.service';
import TransactionsService from '~/services/transactions.service';

import { ITransaction } from '~/interfaces/transaction.interface';
import TransactionsTableItems from './TransactionsTableItems/TransactionsTableItems';

const Transactions: FC = memo(() => {
  const router = useRouter();
  const [ selectFilter, setSelectFilter ] = useState(router.query.filter || 'all');

  const { getCategories } = CategoriesService;
  const { getTransactions } = TransactionsService;

  const transactionsFilter = useMemo(() => ({
    filter: {
      category: (
        (router.query.filter === '0' && { _null: true })
        || (router.query.filter && { _eq: router.query.filter })),
    },
    sort: 'date',
  }), [ router.query.filter ]);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useFetchData(getCategories);
  const categories = categoriesData?.data;

  const {
    data: transactionsData,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useFetchData<{ data: ITransaction[] }>(
    getTransactions,
    transactionsFilter,
  );
  const transactions = transactionsData?.data;

  return (
    <section className="transactions">
      <div className="transactions__container">
        <div className="transactions__header">
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
                  query: value === 'all' ? {} : { filter: value },
                });
              } }
              value={ selectFilter }
            >
              <option
                className="transactions__header__filter__option"
                value="all"
              >
                All
              </option>
              {categories && categories.map((category) => {
                const { id, name } = category;

                return (
                  <option
                    key={ id }
                    className="transactions__header__filter__option"
                    value={ id }
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {(transactionsLoading || categoriesLoading) && <Loader />}
        {transactions && categories && (
          <div className="transactions__table">
            <div className="transactions__table__header">
              <span className="transactions__table__header__item">
                transactions
              </span>
              <span className="transactions__table__header__item">
                category
              </span>
              <span className="transactions__table__header__item">file</span>
              <span className="transactions__table__header__item">amount</span>
              <span className="transactions__table__header__item">date</span>
            </div>
            <TransactionsTableItems transactions={ transactions } categories={ categories } />
          </div>
        )}
        {(transactionsError || categoriesError) && ':('}
      </div>
    </section>
  );
});

export default Transactions;
