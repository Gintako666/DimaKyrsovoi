import {
  FC, useMemo, useState,
} from 'react';
import classNames from 'classnames';

import getFirstLetters from '~/utils/firstLetters.util';

import { ITransaction } from '~/interfaces/transaction.interface';
import { ICategory } from '~/interfaces/category.interface';
import { amountFormater } from '~/utils/amountFormater';
import { format } from 'fecha';
import { getContrastColor } from '~/utils/functions/getContrastColor';

interface ItemProps {
  transaction: ITransaction,
  category: ICategory | null
  categories: ICategory[]
  hendleChangeCategory: (id: number, categoryId: number | null) => Promise<number | null>
}

const Item: FC<ItemProps> = ({
  transaction: {
    id, name, value, date, file,
  },
  category,
  categories,
  hendleChangeCategory,
}) => {
  const [ selectCategory, setSelectCategory ] = useState(category?.id || 0);
  const categoryColor = useMemo(
    () => categories.find(
      (categoryItem) => categoryItem.id === selectCategory,
    )?.color,
    [ categories, selectCategory ],
  );

  const formattedDate = useMemo(() => format(new Date(date), 'MM/DD/YYYY'), [ date ]);
  const tooltipDate = useMemo(() => format(new Date(date), 'MM/DD/YYYY hh:mm:ss'), [ date ]);

  return (
    <div className="transactions__table__item">
      <div className="transactions__table__item__transaction">
        <div className="transactions__table__item__transaction__img">{getFirstLetters(name)}</div>
        <div className="transactions__table__item__transaction__name">{name || 'Unknown'}</div>
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
            onChange={ async (e) => {
              const newCategory = await hendleChangeCategory(id, +e.target.value || null);
              setSelectCategory(newCategory || 0);
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
