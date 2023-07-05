import { FC } from 'react';

import CategoryCards from './CategoryCards/CategoryCards';

import useCategories from './useCategories';

const Categories: FC = () => {
  const categories = useCategories();

  if (categories) {
    return <CategoryCards categories={ categories } />;
  }
  return null;
};

export default Categories;
