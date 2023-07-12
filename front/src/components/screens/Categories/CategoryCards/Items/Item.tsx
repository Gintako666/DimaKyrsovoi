import { FC } from 'react';

import getFirstLetters from '~/utils/firstLetters.util';

import { ICategory } from '~/interfaces/category.interface';
import Buttons from './Buttons/Buttons';

interface ItemProps {
  category: ICategory
}

const Item: FC<ItemProps> = ({
  category,
}) => {
  const { name, color, transactions } = category;

  return (
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
        <Buttons category={ category } />
      </div>
    </div>
  );
};

export default Item;
