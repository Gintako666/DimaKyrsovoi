import useFetchData, { IUseFetchDataResult } from '~/hooks/useFetchData';

interface ICategoriesService {
  (): IUseFetchDataResult
}

const CategoriesService: ICategoriesService = () => useFetchData('/items/category');

export default CategoriesService;
