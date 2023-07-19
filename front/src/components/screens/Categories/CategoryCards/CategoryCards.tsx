import { FC } from 'react';

import Loader from '~/components/shared/Loader/Loader';

import useFetchData from '~/hooks/useFetchData';

import CategoriesService from '~/services/categories.service';

import { ICategory } from '~/interfaces/category.interface';
import Items from './Items/Items';

const CategoryCards: FC = () => {
  const { getCategories } = CategoriesService;
  const { data, isLoading, error } = useFetchData(getCategories);

  const categories: ICategory[] = data?.data;

  if (isLoading) {
    return <Loader />;
  }
  if (error || data?.errors) {
    return ':(';
  }
  if (categories) {
    return <Items categoriesData={ categories } />;
  }

  return null;
};

export default CategoryCards;
