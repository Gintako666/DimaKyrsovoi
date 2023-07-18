import { ICategory } from '~/interfaces/category.interface';
import axiosInstance from './axiosInstance';

const PATH = '/items/category';

const CategoriesService = {
  async getCategories() {
    return axiosInstance.get(PATH);
  },

  async addCategory(category: Pick<ICategory, 'name' | 'color'>) {
    try {
      await axiosInstance.post(PATH, category);
    } catch (err) {
      /* eslint-disable no-console */
      console.log(err);
      /* eslint-disable no-console */
    }
  },

  async deleteCategory(id: ICategory['id']) {
    try {
      await axiosInstance.delete(`${ PATH }/${ id }`);
    } catch (err) {
      /* eslint-disable no-console */
      console.log(err);
      /* eslint-disable no-console */
    }
  },

  async editCategory(editedCategory: ICategory) {
    try {
      const { id } = editedCategory;
      await axiosInstance.patch(`${ PATH }/${ id }`, editedCategory);
    } catch (err) {
      /* eslint-disable no-console */
      console.log(err);
      /* eslint-disable no-console */
    }
  },
};

export default CategoriesService;
