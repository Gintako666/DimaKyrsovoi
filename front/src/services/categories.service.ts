import { directus } from '~/contexts/user';

import { ICategory } from '~/interfaces/category.interface';

const PATH = 'category';

const CategoriesService = {
  async getAllCategories(params: null |
  { withUncategorized: boolean }) {
    const result = await directus.items(PATH).readByQuery();

    if (params?.withUncategorized) {
      result.data?.push({
        name: 'Uncategorized',
        id: 0,
        color: '#636363',
        transactions: [],
      });
    }

    return result as Promise<{ data: ICategory[] }>;
  },

  async getCategories(
    params: null |
    { categoryId: number },
  ) {
    const result = await directus.items(PATH).readByQuery({
      filter: {
        parent_category: params?.categoryId
          ? { _eq: params?.categoryId }
          : { _null: true },
      },
    });

    return result as Promise<{ data: ICategory[] }>;
  },

  async getCategoryById(
    id: number,
  ) {
    const result = await directus.items(PATH).readByQuery({
      filter: {
        id: { _eq: id },
      },
    });

    return result as Promise<{ data: ICategory[] }>;
  },

  async addCategory(category: Pick<ICategory, 'name' | 'color' | 'parent_category'>) {
    return directus.items(PATH).createOne(category) as Promise<ICategory>;
  },

  async deleteCategory(id: ICategory['id']) {
    try {
      await directus.items(PATH).deleteOne(id);
    } catch (err) {
      console.error(err);
    }
  },

  async editCategory(editedCategory: ICategory) {
    try {
      const { id } = editedCategory;
      await directus.items(PATH).updateOne(id, editedCategory);
    } catch (err) {
      console.error(err);
    }
  },
};

export default CategoriesService;
