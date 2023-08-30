import { useCallback, useMemo } from 'react';
import { ICategory } from '~/interfaces/category.interface';
import { getCategoriesListForBraedCrumbs } from '~/utils/functions/getCategoriesListForBraedCrumbs';

export const useCategoriesExtraData = (
  curentCategory: ICategory | null,
  childCategories: ICategory[] | null,
  allCategories: ICategory[] | null,
) => {
  const getChildCategoriesLengthFromCategoryList = useCallback(
    (categoryList: ICategory[] | null) => (
      categoryList?.map((category) => ({
        id: category.id,
        cildCategoryCount: allCategories?.filter((categoryItem) => (
          categoryItem.parent_category === category.id)).length,
      }))),
    [ allCategories ],
  );

  const result = useMemo(() => ({
    curentCategoryParentsList: getCategoriesListForBraedCrumbs(curentCategory, allCategories),
    childCategoriesList: getChildCategoriesLengthFromCategoryList(childCategories),
  }), [ curentCategory, allCategories, getChildCategoriesLengthFromCategoryList, childCategories ]);

  return result;
};

export default useCategoriesExtraData;
