import { FC } from 'react';

import Item from './Item';

import { ICategory } from '../../category.interface';

interface ItemsProps {
  categories: ICategory[]
}

const Items: FC<ItemsProps> = ({ categories }) => {
  const items = categories.map((category, index) => {
    const id = index;

    return <Item key={ id } category={ category } />;
  });

  return (
    <div className="category-cards__items">{items}</div>
  );
};

export default Items;
