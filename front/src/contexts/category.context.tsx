import { useRouter } from 'next/router';
import React, {
  useState, ReactNode, useMemo, useEffect,
} from 'react';
import { useCategoriesExtraData } from '~/hooks/useCategoriesExtraData';
import useFetchData from '~/hooks/useFetchData';
import { ICategory, ICategoryWithChildLength } from '~/interfaces/category.interface';
import CategoriesService from '~/services/categories.service';

type ContextValue = {
  categories: ICategoryWithChildLength[] | null,
  setCategories: React.Dispatch<React.SetStateAction<ICategory[] | null>>,
  currentCategory: ICategory | null,
  setCurrentCategory: React.Dispatch<React.SetStateAction<ICategory | null>>,
  error: string
  isLoading: boolean,
  openPopup: boolean,
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>,

  curentCategoryParentsList: ICategory[],
};

export const CategoriesContext = React.createContext<ContextValue>({
  categories: null,
  setCategories: () => {},
  currentCategory: null,
  setCurrentCategory: () => {},
  error: '',
  isLoading: false,
  openPopup: false,
  setOpenPopup: () => {},

  curentCategoryParentsList: [],
});

type Props = {
  children: ReactNode
};

export const CategoryContextProvider: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { query } = router;
  const { category: categoryId } = query;
  const reqParam = useMemo(() => ({ categoryId }), [ categoryId ]);

  const { getCategories, getCategoryById, getAllCategories } = CategoriesService;
  const { data: categoriesData, isLoading, error } = useFetchData(getCategories, reqParam);
  const {
    data: curentCategory,
  } = useFetchData(getCategoryById, categoryId);
  const {
    data: allCategories,
  } = useFetchData(getAllCategories);

  const {
    curentCategoryParentsList, childCategoriesList,
  } = useCategoriesExtraData(
    curentCategory?.data[0] || null,
    categoriesData?.data || null,
    allCategories?.data || null,
  );

  const [ categories, setCategories ] = useState<ICategory[] | null>(null);
  const [ currentCategory, setCurrentCategory ] = useState<ICategory | null>(null);
  const [ openPopup, setOpenPopup ] = useState(false);

  useEffect(() => {
    setCategories(categoriesData?.data || null);
    setCurrentCategory(curentCategory?.data[0] || null);
  }, [ curentCategory?.data, categoriesData?.data ]);

  const contextValue: ContextValue = useMemo(() => ({
    categories: categories?.map((categoryItem) => ({
      ...categoryItem,
      childLength: childCategoriesList?.find((item) => (
        item.id === categoryItem.id
      ))?.cildCategoryCount || 0,
    })) || null,
    setCategories,

    currentCategory,
    setCurrentCategory,

    isLoading,
    error,

    openPopup,
    setOpenPopup,

    curentCategoryParentsList,
  }), [
    categories,
    childCategoriesList,
    curentCategoryParentsList,
    currentCategory,
    error,
    isLoading,
    openPopup ]);

  return (
    <CategoriesContext.Provider value={ contextValue }>
      {children}
    </CategoriesContext.Provider>
  );
};
