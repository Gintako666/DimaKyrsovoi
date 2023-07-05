import { ICategory } from '~/interfaces/category.interface';

const API_URL = `${ process.env.NEXT_PUBLIC_BACK_URI }/items/category`;

interface ICategoriesData {
  data: ICategory[]
}

interface IFetchCategoriesData {
  (): Promise<ICategoriesData>;
}

const fetchCategoriesData: IFetchCategoriesData = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();
  return result;
};

export default fetchCategoriesData;
