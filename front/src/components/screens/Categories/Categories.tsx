import { FC } from 'react';

import CategoryCards from './CategoryCards/CategoryCards';

import categories from './categories.const';

const Categories: FC = () => (
  <CategoryCards categories={ categories } />
);

export default Categories;
