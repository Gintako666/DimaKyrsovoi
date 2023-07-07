import { ICategory } from '~/interfaces/category.interface';
import axiosInstance from './axiosInstance';

const path = '/items/category';

const CategoriesService = {
  async getCategories() {
    return axiosInstance.get(path);
  },

  async addCategory(category: Pick<ICategory, 'name' | 'color'>) {
    try {
      await axiosInstance.post(path, category);
    } catch (err) {
      alert(err);
      throw err;
    }
  },
};

export default CategoriesService;
