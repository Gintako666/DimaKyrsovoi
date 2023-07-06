import useFetchData, { IUseFetchDataResult } from '~/hooks/useFetchData';

import { ICategory } from '~/interfaces/category.interface';
import axiosInstance from './axiosInstance';

const path = '/items/category';

interface ICategoriesService {
  (): IUseFetchDataResult
}

const CategoriesService: ICategoriesService = () => useFetchData(path);

interface IAddCategory {
  (category: Pick<ICategory, 'name' | 'color'>): void
}

export const addCategory: IAddCategory = (category) => {
  try {
    axiosInstance.post(path, category);
  } catch (err) {
    alert(err);
  }
};

export default CategoriesService;
