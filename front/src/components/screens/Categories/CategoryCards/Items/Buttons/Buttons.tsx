import { Dispatch, FC, SetStateAction } from 'react';

import { ICategory } from '~/interfaces/category.interface';
import Edit from './Items/Edit';
import Delete from './Items/Delete';

interface ButtonsProps {
  category: ICategory;
  setDeletedCategoryId: Dispatch<SetStateAction<ICategory['id'] | null>>
}

const Buttons: FC<ButtonsProps> = ({
  category,
  setDeletedCategoryId,
}) => (
  <ul className="category-cards__buttons">
    <li>
      <Edit />
    </li>
    <li>
      <Delete category={ category } setDeletedCategoryId={ setDeletedCategoryId } />
    </li>
  </ul>
);

export default Buttons;
