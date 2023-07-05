import { useState, useEffect } from 'react';

import fetchCategoriesData from '~/services/categoriesApi';

import { ICategory } from '~/interfaces/category.interface';

interface IUseCategories {
  (): ICategory[] | undefined;
}

const useCategories: IUseCategories = () => {
  const [ categories, setCategories ] = useState<ICategory[] >();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await fetchCategoriesData();
      setCategories(data.data);
    };
    fetchProducts();
  }, []);

  return categories;
};

export default useCategories;
