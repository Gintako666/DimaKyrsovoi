import { FC, useCallback, useMemo } from 'react';
import classNames from 'classnames';

import getFirstLetters from '~/utils/firstLetters.util';

import { ITransaction } from '~/interfaces/transaction.interface';
import { ICategory } from '~/interfaces/category.interface';
import axiosInstance from '~/services/axiosInstance';
import { amountFormater } from '~/utils/amountFormater';

interface ItemProps {
  transaction: ITransaction,
  category: ICategory | null
  categorys: ICategory[]
}

const Item: FC<ItemProps> = ({
  transaction: {
    id, name, bank, value, type, status, date,
  },
  category,
  categorys,
}) => {
  const hendleChangeCategory = useCallback((newCategory: number | null) => {
    axiosInstance.patch(`/items/transaction/${ id }`, {
      category: newCategory,
    });
  }, [ id ]);

  const formatDate = useCallback((apiDate: string) => {
    const date2 = new Date(apiDate);
    const formattedDate = `${ date2.getMonth() + 1 }/${ date2.getDate() }/${ date2.getFullYear() }`;
    return formattedDate;
  }, []);

  const formattedDate = useMemo(() => formatDate(date), [ date, formatDate ]);
  const tooltipDate = useMemo(() => new Date(date).toLocaleString('en-US'), [ date ]);

  return (
    <div className="transactions__table__item">
      <div className="transactions__table__item__transaction">
        <div className="transactions__table__item__transaction__img">{getFirstLetters(name)}</div>
        <div className="transactions__table__item__transaction__name">{name || 'Unknown'}</div>
        <div className="transactions__table__item__transaction__bank">{bank || 'Unknown'}</div>
      </div>
      <div className="transactions__table__item__category">
        <p className="transactions__table__item__media">Category: </p>
        <div className="transactions__table__item__category__info">
          <select
            className="transactions__table__item__category__name"
            name=""
            id=""
            defaultValue={ category?.id || 0 }
            onChange={ (e) => hendleChangeCategory(+e.target.value || null) }
          >
            {categorys.map((categoryItem) => (
              <option
                key={ categoryItem.id }
                value={ categoryItem.id }
              >
                {categoryItem.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="transactions__table__item__type">
        <p className="transactions__table__item__media">Type: </p>
        {type}
      </div>
      <div className="transactions__table__item__amount">
        <p className="transactions__table__item__media">Amount: </p>
        <p className={ classNames(
          'transactions__table__item__amount__info',
          {
            'transactions__table__item__amount__info--pending': status === 'Pending',
            'transactions__table__item__amount__info--rejected': status === 'Rejected',
          },
        ) }
        >
          {amountFormater.format(+value)}
        </p>
      </div>
      <div className="transactions__table__item__type">
        <p className="transactions__table__item__media">Date: </p>
        <div title={ tooltipDate }>{formattedDate}</div>
      </div>
    </div>
  );
};

export default Item;
