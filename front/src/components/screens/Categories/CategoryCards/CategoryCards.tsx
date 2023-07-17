import { FC } from 'react';

import Loader from '~/components/shared/Loader/Loader';

import useFetchData from '~/hooks/useFetchData';

import useDirectusApi from '~/hooks/useDirectusApi';
import Items from './Items/Items';

const CategoryCards: FC = () => {
  const { getCategories } = useDirectusApi();
  const { data: categories, isLoading, error } = useFetchData(getCategories);

  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return ':(';
  }
  if (categories) {
    return <Items categoriesData={ categories } />;
  }

  return null;
};

export default CategoryCards;
