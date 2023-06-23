import { FC, useEffect, useRef } from 'react';
import randomColor from 'randomcolor';

import ButtonMore from './ButtonMore';

import { ICategory } from '../../category.interface';

interface ItemProps {
  category: ICategory
}

const Item: FC<ItemProps> = ({ category: { name, number, type } }) => {
  const imageRef = useRef<HTMLDivElement>(null);

  interface ColorStorage {
    [name: string]: string;
  }

  // Get storage color
  interface IGetColorStorage {
    (): ColorStorage
  }
  const getStorageColor: IGetColorStorage = () => {
    const existingColors = localStorage.getItem('colors');

    if (existingColors) {
      return JSON.parse(existingColors);
    }
    return {};
  };

  // Save color
  interface ISaveColor {
    (color: string): void
  }
  const saveColor: ISaveColor = (color) => {
    const colorStorage = getStorageColor();
    colorStorage[name] = color;
    localStorage.setItem('colors', JSON.stringify(colorStorage));
  };

  // Get color
  interface IGetColor {
    (): string
  }
  const getColor: IGetColor = () => {
    const colorStorage = getStorageColor();

    const existingColor = colorStorage[name];
    if (existingColor) {
      return existingColor;
    }

    const color = randomColor({ luminosity: 'dark' });
    saveColor(color);
    return color;
  };

  useEffect(() => {
    const imageElement = imageRef.current;
    const color = getColor();

    if (imageElement) {
      imageElement.style.background = color;
    }
  }, [ name ]);

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
      <div className="category-cards__image" ref={ imageRef }>{getFirstLetters(name)}</div>
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
