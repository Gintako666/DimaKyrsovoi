import { Dispatch, FC, SetStateAction } from 'react';

import { ICategory } from '~/interfaces/category.interface';
import Edit from './Items/Edit/Edit';
import Delete from './Items/Delete';

interface ButtonsProps {
  category: ICategory;
  setDeletedCategoryId: Dispatch<SetStateAction<ICategory['id'] | null>>
  setEditedCategory: Dispatch<SetStateAction<ICategory | null>>
}

const Buttons: FC<ButtonsProps> = ({
  category,
  setDeletedCategoryId,
  setEditedCategory,
}) => (
  <ul className="category-cards__buttons">
    <li>
      <Edit category={ category } setEditedCategory={ setEditedCategory } />
    </li>
    <li>
      <Delete category={ category } setDeletedCategoryId={ setDeletedCategoryId } />
    </li>
  </ul>
);

export default Buttons;
