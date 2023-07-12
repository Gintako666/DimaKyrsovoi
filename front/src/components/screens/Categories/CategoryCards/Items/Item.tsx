import { FC } from 'react';

import getFirstLetters from '~/utils/firstLetters.util';

import { ICategory } from '~/interfaces/category.interface';
import ButtonMore from './ButtonMore';

interface ItemProps {
  category: ICategory
}

const Item: FC<ItemProps> = ({
  category: {
    name, color, transactions,
  },
}) => (
  <div className="category-cards__item">
    <div className="category-cards__image" style={ { backgroundColor: color } }>{getFirstLetters(name)}</div>
    <div className="category-cards__main">
      <div className="category-cards__text">
        <h4 className="category-cards__name">{name}</h4>
        <div className="category-cards__label">
          {transactions.length}
          {' '}
          <span> transaction</span>
        </div>
      </div>
      <ButtonMore />
    </div>
  </div>
);

export default Item;
