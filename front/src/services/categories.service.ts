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
      alert(err);
      throw err;
    }
  },
};

export default CategoriesService;
