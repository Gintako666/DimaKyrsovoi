import {
  FC, useContext, useEffect, useMemo,
} from 'react';

import Loader from '~/components/shared/Loader/Loader';

// import useFetchData from '~/hooks/useFetchData';

// import CategoriesService from '~/services/categories.service';

// import { useRouter } from 'next/router';
import { CategoriesContext } from '~/contexts/category.context';
import Items from './Items/Items';

const CategoryCards: FC = () => {
  // const router = useRouter();
  // const { getCategories } = CategoriesService;
  // const { query } = router;
  // const { category: categoryId } = query;
  // const reqParam = useMemo(() => ({ categoryId }), [ categoryId ]);
  // const { data, isLoading, error } = useFetchData(getCategories, reqParam);

  // const categories = useMemo(() => data?.data, [ data?.data ]);

  const { categories, isLoading, error } = useContext(CategoriesContext);

  // useEffect(() => {
  //   console.log('enter effect');
  //   setCategories(categories || null);
  // }, [ categories, setCategories ]);

  // console.log(qwe, categories);

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
