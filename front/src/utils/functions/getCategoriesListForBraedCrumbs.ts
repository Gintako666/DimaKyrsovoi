import { ICategory } from '~/interfaces/category.interface';

export function getCategoriesListForBraedCrumbs(
  curentCategory: ICategory | null,
  allCategories: ICategory[] | null,
): ICategory[] {
  const result: ICategory[] = curentCategory ? [ curentCategory ] : [];

  const getParentCategoryList = (
    category: ICategory | null,
  ) => {
    if (!category || !category.parent_category) {
      return;
    }

    const parentCategory = allCategories?.find((categoryItem) => (
      categoryItem.id === category.parent_category));

    if (!parentCategory) {
      return;
    }
    result.unshift(parentCategory);
    getParentCategoryList(parentCategory);
  };

  getParentCategoryList(curentCategory);

  return result;
}

export default getCategoriesListForBraedCrumbs;
