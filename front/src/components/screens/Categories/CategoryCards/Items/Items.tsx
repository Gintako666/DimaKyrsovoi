import {
  FC, useContext,
} from 'react';

import { CategoriesContext } from '~/contexts/category.context';
import Item from './Item';

const Items: FC = () => {
  const { categories } = useContext(CategoriesContext);

  const items = categories?.map((category) => {
    const { id } = category;

    return (
      <Item
        key={ id }
        category={ category }
      />
    );
  });

  return (
    <div className="category-cards__items">
      {items}
    </div>
  );
};

export default Items;
