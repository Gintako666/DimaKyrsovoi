import { FC } from 'react';

import useFetchData from '~/hooks/useFetchData';
import Loader from '~/components/shared/Loader/Loader';
import Items from './Items/Items';

const CategoryCards: FC = () => {
  const { data, isLoading, error } = useFetchData(`${ process.env.NEXT_PUBLIC_BACK_URI }/items/category`);
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
