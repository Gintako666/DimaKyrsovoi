import { FC, useEffect, useState } from 'react';

import { ICategory } from '~/interfaces/category.interface';
import Item from './Item';

interface ItemsProps {
  categoriesData: ICategory[]
}

const Items: FC<ItemsProps> = ({ categoriesData }) => {
  const [ deletedCategoryId, setDeletedCategoryId ] = useState<ICategory['id'] | null>(null);
  const [ editedCategory, setEditedCategory ] = useState<ICategory | null>(null);

  const [ categories, setCategories ] = useState(categoriesData);

  useEffect(() => {
    if (deletedCategoryId) {
      setCategories(
        (prevCategories) => prevCategories.filter(
          (category) => {
            const { id } = category;

            return id !== deletedCategoryId;
          },
        ),
      );
      setDeletedCategoryId(null);
    }
  }, [ deletedCategoryId ]);

  useEffect(() => {
    if (editedCategory) {
      setCategories(
        (prevCategories) => prevCategories.map(
          (category) => (category.id === editedCategory.id ? editedCategory : category),
        ),
      );
      setEditedCategory(null);
    }
  }, [ editedCategory ]);

  const items = categories.map((category) => {
    const { id } = category;

    return (
      <Item
        key={ id }
        category={ category }
        setDeletedCategoryId={ setDeletedCategoryId }
        setEditedCategory={ setEditedCategory }
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
