import { FC } from 'react';

import Loader from '~/components/shared/Loader/Loader';

import useFetchData from '~/hooks/useFetchData';

import CategoriesService from '~/services/categories.service';
import Items from './Items/Items';

const CategoryCards: FC = () => {
  const { getCategories } = CategoriesService;
  const { data, isLoading, error } = useFetchData(getCategories);
  const categories = data?.data;

  if (isLoading) {
    return <Loader />;
  }
  if (categories) {
    return <Items categoriesData={ categories } />;
  }
  if (error || data?.errors) {
    return ':(';
  }
  return null;
};

export default CategoryCards;
