import { directus } from '~/contexts/user';

import { ICategory } from '~/interfaces/category.interface';

const PATH = 'category';

const CategoriesService = {
  async getCategories() {
    const result = directus.items(PATH).readByQuery();
    return result as Promise<{ data: ICategory[] }>;
  },

  async addCategory(category: Pick<ICategory, 'name' | 'color'>) {
    try {
      await directus.items(PATH).createOne(category);
    } catch (err) {
      /* eslint-disable no-console */
      console.error(err);
    }
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
