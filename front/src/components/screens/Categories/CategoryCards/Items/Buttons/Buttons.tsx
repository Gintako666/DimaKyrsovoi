import { FC } from 'react';

import { ICategory } from '~/interfaces/category.interface';
import Edit from './Items/Edit/Edit';
import Delete from './Items/Delete';

interface ButtonsProps {
  category: ICategory;
}

const Buttons: FC<ButtonsProps> = ({
  category,
}) => (
  <ul className="category-cards__buttons">
    <li>
      <Edit category={ category } />
    </li>
    <li>
      <Delete category={ category } />
    </li>
  </ul>
);

export default Buttons;
