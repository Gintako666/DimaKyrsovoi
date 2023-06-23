import { FC } from 'react';
import randomColor from 'randomcolor';

import ButtonMore from './ButtonMore';
import { ICategory } from '../../category.interface';

interface ItemProps {
  category: ICategory
}

const Item: FC<ItemProps> = ({ category: { name, number, type } }) => {
  const getColor = () => {
    const existingColor = localStorage.getItem(name);
    if (existingColor) {
      return existingColor;
    }

    const color = randomColor();
    localStorage.setItem(name, color);
    return color;
  };

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
      <div className="category-cards__image" style={ { backgroundColor: getColor() } }>{getFirstLetters(name)}</div>
      <div className="category-cards__main">
        <div className="category-cards__text">
          <h4 className="category-cards__name">{name}</h4>
          <div className="category-cards__label">
            {number}
            {' '}
            <span>{type}</span>
          </div>
        </div>
        <ButtonMore />
      </div>
    </div>

  );
};

export default Item;
