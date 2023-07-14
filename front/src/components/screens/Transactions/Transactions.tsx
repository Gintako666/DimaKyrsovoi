import {
  FC, memo, useMemo, useState,
} from 'react';

import Loader from '~/components/shared/Loader/Loader';
import Title from '~/components/shared/Title/Title';

import useFetchData from '~/hooks/useFetchData';

import TransactionsService from '~/services/transactions.service';
import CategoriesService from '~/services/categories.service';

import { ITransaction } from '~/interfaces/transaction.interface';
import { ICategory } from '~/interfaces/category.interface';
import { useRouter } from 'next/router';
import TransactionsTableItems from './TransactionsTableItems/TransactionsTableItems';

const Transactions: FC = memo(() => {
  const router = useRouter();
  const [ selectFilter, setSelectFilter ] = useState(router.query.filter || 'all');
  const { getTransactions } = TransactionsService;
  const requestFilter = useMemo(() => (router.query.filter && `filter={ "category": ${
    router.query.filter === '0'
      ? '{"_null": true}'
      : `{"_eq": "${ router.query.filter }"}`
  }}`) || '', [ router.query.filter ]);
  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    error,
  } = useFetchData(getTransactions, `?fields=*,category.*&${ requestFilter || '' }`);
  const transactions: ITransaction[] = transactionsData?.data;

  const { getCategories } = CategoriesService;
  const { data: categoriesData, isLoading: isLoadingCategorys } = useFetchData(getCategories);
  const categories: ICategory[] = categoriesData?.data;
  const renderCategorys: ICategory[] | null = useMemo(() => {
    if (categories) {
      return [ ...categories, {
        name: 'Uncategorized',
        id: 0,
        color: '',
        transactions: [],
      } ];
    }

    return null;
  }, [ categories ]);

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
              {renderCategorys?.map((category) => {
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
        {(isLoadingTransactions || isLoadingCategorys) && <Loader />}
        {transactions && renderCategorys && (
          <div className="transactions__table">
            <div className="transactions__table__header">
              <span className="transactions__table__header__item">
                transactions
              </span>
              <span className="transactions__table__header__item">
                category
              </span>
              <span className="transactions__table__header__item">type</span>
              <span className="transactions__table__header__item">amount</span>
            </div>
            <TransactionsTableItems transactions={ transactions } categorys={ renderCategorys } />
          </div>
        )}
        {(error || transactionsData?.errors) && ':('}
      </div>
    </section>
  );
});

export default Transactions;
