import { FC } from 'react';

import { ICategory } from '~/interfaces/category.interface';
import ButtonMore from './ButtonMore';

interface ItemProps {
  category: ICategory
}

const Item: FC<ItemProps> = ({
  category: {
    name, color, transactions,
  },
}) => {
  // Get first letters
  interface IGetFirstLetters {
    (string: string): string
  }
  const getFirstLetters: IGetFirstLetters = (string) => {
    const words = string.split(' ');

    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }

    const firstLetters = words
      .slice(0, 2)
      .map((word) => word.charAt(0).toUpperCase());

    return firstLetters.join('');
  };

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
        <ButtonMore />
      </div>
    </div>
  );
};

export default Item;
