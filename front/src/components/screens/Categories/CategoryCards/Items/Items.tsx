import { FC } from 'react';

import { ICategory } from '~/interfaces/category.interface';
import Item from './Item';

interface ItemsProps {
  categories: ICategory[]
}

const Items: FC<ItemsProps> = ({ categories }) => {
  const items = categories.map((category) => {
    const { id } = category;

    return <Item key={ id } category={ category } />;
  });

  return (
    <div className="category-cards__items">{items}</div>
  );
};

export default Items;
