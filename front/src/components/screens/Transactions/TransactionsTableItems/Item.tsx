import { FC } from 'react';
import classNames from 'classnames';

import getFirstLetters from '~/utils/firstLetters.util';

import { ITransaction } from '~/interfaces/transaction.interface';
import { ICategory } from '~/interfaces/category.interface';

interface ItemProps {
  transaction: ITransaction,
  category: ICategory | undefined
}

const Item: FC<ItemProps> = ({
  transaction: {
    name, bank, value, type, status,
  },
  category,
}) => (
  <div className="transactions__table__item">
    <div className="transactions__table__item__transaction">
      {/* <Img
        img={ {
          src: img,
          alt: 'Bank',
        } }
        className="transactions__table__item__transaction"
      /> */}
      <div className="transactions__table__item__transaction__img">{getFirstLetters(name)}</div>
      <div className="transactions__table__item__transaction__name">{name}</div>
      <div className="transactions__table__item__transaction__bank">{bank}</div>
    </div>
    <div className="transactions__table__item__category">
      <p className="transactions__table__item__media">Status: </p>
      <div className="transactions__table__item__category__info">
        {/* <div className="transactions__table__item__category__name">
          {category.name || 'Unknown'}
        </div> */}
        {/* <div className="transactions__table__item__category__type">
          {category.type || 'Unknown'}
        </div> */}
        <div className="transactions__table__item__category__name">{category?.name || 'Unknown'}</div>
      </div>
    </div>
    <div className="transactions__table__item__type">
      <p className="transactions__table__item__media">Type: </p>
      {type}
    </div>
    <div className="transactions__table__item__status">
      <p className="transactions__table__item__media">Status: </p>
      <p className={ classNames(
        'transactions__table__item__status__info',
        {
          'transactions__table__item__status__info--paid': status === 'Paid',
          'transactions__table__item__status__info--pending': status === 'Pending',
          'transactions__table__item__status__info--rejected': status === 'Rejected',
        },
      ) }
      >
        {status}

      </p>
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
        {Math.round(Number(value))}
        $
      </p>
    </div>
    <button type="button" className="transactions__table__item__button">Details</button>
  </div>
);

export default Item;
