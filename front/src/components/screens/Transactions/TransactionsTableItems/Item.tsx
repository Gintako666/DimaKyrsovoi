import {
  FC, useCallback, useMemo, useState,
} from 'react';
import classNames from 'classnames';

import getFirstLetters from '~/utils/firstLetters.util';

import { ITransaction } from '~/interfaces/transaction.interface';
import { ICategory } from '~/interfaces/category.interface';
import { amountFormater } from '~/utils/amountFormater';
import { format } from 'fecha';
import useDirectusApi from '~/hooks/useDirectusApi';

interface ItemProps {
  transaction: ITransaction,
  category: ICategory | null
  categories: ICategory[]
}

const Item: FC<ItemProps> = ({
  transaction: {
    id, name, bank, value, date, file,
  },
  category,
  categories,
}) => {
  const { editCategoryInTransaction } = useDirectusApi();
  const hendleChangeCategory = useCallback((newCategory: number | null) => {
    editCategoryInTransaction(id, newCategory);
  }, [ editCategoryInTransaction, id ]);
  const [ selectCategory, setSelectCategory ] = useState(category?.id || 0);
  const categoryColor = useMemo(
    () => categories.find(
      (categoryItem) => categoryItem.id === selectCategory,
    )?.color,
    [ categories, selectCategory ],
  );

  const getContrastColor = useCallback((background: string | undefined): string => {
    if (!background) {
      return '#000000';
    }

    const r = parseInt(background.substr(1, 2), 16);
    const g = parseInt(background.substr(3, 2), 16);
    const b = parseInt(background.substr(5, 2), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    const textColor = brightness > 128 ? '#000000' : '#ffffff';

    return textColor;
  }, []);

  const formattedDate = useMemo(() => format(new Date(date), 'MM/DD/YYYY'), [ date ]);
  const tooltipDate = useMemo(() => format(new Date(date), 'MM/DD/YYYY hh:mm:ss'), [ date ]);

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
            style={ {
              background: `${ categoryColor }`,
              color: `${ getContrastColor(categoryColor) }`,
            } }
            className="transactions__table__item__category__name"
            name=""
            id=""
            value={ selectCategory }
            onChange={ (e) => {
              hendleChangeCategory(+e.target.value || null);
              setSelectCategory(+e.target.value);
            } }
          >
            {categories.map((categoryItem) => (
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
        <p className="transactions__table__item__media">File: </p>
        {file?.name || 'no file'}
      </div>
      <div className="transactions__table__item__amount">
        <p className="transactions__table__item__media">Amount: </p>
        <p className={ classNames(
          'transactions__table__item__amount__info',
          {
            'transactions__table__item__amount__info--outgoing': +value < 0,
            'transactions__table__item__amount__info--incoming': +value > 0,
          },
        ) }
        >
          {amountFormater.format(Math.abs(+value))}
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
