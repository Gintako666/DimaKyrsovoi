import {
  FC, useContext,
} from 'react';

import Loader from '~/components/shared/Loader/Loader';
import { CategoriesContext } from '~/contexts/category.context';
import Items from './Items/Items';

const CategoryCards: FC = () => {
  const { categories, isLoading, error } = useContext(CategoriesContext);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return ':(';
  }
  if (categories) {
    return <Items />;
  }

  return null;
};

export default CategoryCards;
