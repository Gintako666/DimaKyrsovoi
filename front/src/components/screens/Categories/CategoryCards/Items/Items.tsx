import { FC, useEffect, useState } from 'react';

import { ICategory } from '~/interfaces/category.interface';
import Item from './Item';

interface ItemsProps {
  categoriesData: ICategory[]
}

const Items: FC<ItemsProps> = ({ categoriesData }) => {
  const [ deletedCategoryId, setDeletedCategoryId ] = useState<ICategory['id'] | null>(null);
  const [ categories, setCategories ] = useState(categoriesData);

  useEffect(() => {
    if (deletedCategoryId) {
      setCategories(
        (prevCategories) => prevCategories.filter((category) => {
          const { id } = category;

          return id !== deletedCategoryId;
        }),
      );
      setDeletedCategoryId(null);
    }
  }, [ deletedCategoryId ]);

  const items = categories.map((category) => {
    const { id } = category;

    return <Item key={ id } category={ category } setDeletedCategoryId={ setDeletedCategoryId } />;
  });

  return (
    <div className="category-cards__items">{items}</div>
  );
};

export default Items;
