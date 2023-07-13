import { FC, memo } from 'react';
// import { useRouter } from 'next/router';

import Loader from '~/components/shared/Loader/Loader';
import Title from '~/components/shared/Title/Title';

import useFetchData from '~/hooks/useFetchData';

import TransactionsService from '~/services/transactions.service';
import CategoriesService from '~/services/categories.service';

import { ITransaction } from '~/interfaces/transaction.interface';
import { ICategory } from '~/interfaces/category.interface';
import TransactionsTableItems from './TransactionsTableItems/TransactionsTableItems';

// import transactionsFromApi from './transactions.json';

const Transactions: FC = memo(() => {
  const { getTransactions } = TransactionsService;
  const {
    data: transactionsData,
    isLoading,
    error,
  } = useFetchData(getTransactions);
  const transactions: ITransaction[] = transactionsData?.data;

  const { getCategories } = CategoriesService;
  const { data: categoriesData } = useFetchData(getCategories);
  const categories: ICategory[] = categoriesData?.data;

  // const [ transactions, setTransactions ] = useState<ITransaction[] | null>(null);
  // Пока нету апи используем renderTransactions, после будем использовать transactions для рендера
  // const [ renderTransactions, setRenderTransactions ] = useState<ITransaction[]>([]);
  // const [ selectFilter, setSelectFilter ] = useState('all');
  // const router = useRouter();

  // useEffect(() => {
  // Запрос на сервер
  // setTimeout(
  // () => {
  // setTransactions(transactionsFromApi as ITransaction[]);
  // },
  // 500,
  // );
  // }, [ selectFilter ]);

  // Убираем после того как будет апи
  // useEffect(() => {
  // if (transactions) {
  // if (selectFilter !== 'all') {
  // setRenderTransactions(transactions
  // .filter((transaction) => (
  // transaction.status === selectFilter
  // || transaction.type === selectFilter
  // )));
  // } else {
  // setRenderTransactions(transactions);
  // }
  // }
  // }, [ selectFilter, transactions ]);

  // if (!transactions) {
  // return <Loader />;
  // }

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
              // onChange={ (e) => {
              //   const { value } = e.target;
              //   setSelectFilter(value);
              //   router.push({
              //     query: value !== 'all' ? { filter: value } : {},
              //   });
              // } }
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
                Uncategorized
              </option>
              {categories?.map((category) => {
                const { id, name } = category;

                return (
                  <option
                    key={ id }
                    className="transactions__header__filter__option"
                    value="Pending"
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        {isLoading && <Loader />}
        {transactions && (
          <div className="transactions__table">
            <div className="transactions__table__header">
              <span className="transactions__table__header__item">
                transactions
              </span>
              <span className="transactions__table__header__item">
                category
              </span>
              <span className="transactions__table__header__item">type</span>
              <span className="transactions__table__header__item">status</span>
              <span className="transactions__table__header__item">amount</span>
            </div>
            <TransactionsTableItems transactions={ transactions } categories={ categories } />
          </div>
        )}
        {(error || transactionsData?.errors) && ':('}
      </div>
    </section>
  );
});

export default Transactions;
