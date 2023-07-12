import { FC } from 'react';

import { ICategory } from '~/interfaces/category.interface';
import Edit from './Items/Edit';
import Remove from './Items/Remove';

interface ButtonsProps {
  category: ICategory;
}

const Buttons: FC<ButtonsProps> = ({
  category,
}) => {
  let t;

  return (
    <ul className="category-cards__buttons">
      <li>
        <Edit />
      </li>
      <li>
        <Remove category={ category } />
      </li>
    </ul>
  );
};

export default Buttons;
