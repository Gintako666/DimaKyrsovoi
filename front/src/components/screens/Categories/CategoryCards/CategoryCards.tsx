import { FC } from 'react';

import Loader from '~/components/shared/Loader/Loader';
import CategoriesService from '~/services/categories.service';
import Items from './Items/Items';

const CategoryCards: FC = () => {
  const { data, isLoading, error } = CategoriesService();
  const categories = data?.data;

  if (isLoading) {
    return <Loader />;
  }
  if (!isLoading && categories) {
    return <Items categories={ categories } />;
  }
  if (error || data?.errors) {
    return ':(';
  }
  return null;
};

export default CategoryCards;
