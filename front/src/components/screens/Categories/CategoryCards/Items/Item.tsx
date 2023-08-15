import { FC } from 'react';

import getFirstLetters from '~/utils/firstLetters.util';

import { ICategoryWithChildLength } from '~/interfaces/category.interface';
import Link from 'next/link';
import Buttons from './Buttons/Buttons';

interface ItemProps {
  category: ICategoryWithChildLength,
}

const Item: FC<ItemProps> = ({
  category,
}) => {
  const {
    name, color, transactions, id, childLength,
  } = category;

  return (
    <div className="category-cards__item">
      <div
        className="category-cards__image"
        style={ { backgroundColor: color } }
      >
        {getFirstLetters(name)}
      </div>
      <div className="category-cards__main">
        <div className="category-cards__text">
          <Link href={ `/categories/${ id }` }><h4 className="category-cards__name">{name}</h4></Link>
          <div className="category-cards__label">
            {transactions.length}
            {' '}
            <span> transaction</span>
          </div>
          <div className="category-cards__label">
            {childLength}
            {' '}
            <span>subcategories</span>
          </div>
        </div>
        <Buttons
          category={ category }
        />
      </div>
    </div>
  );
};

export default Item;
