import { NextPage } from 'next';
import Layout from '~/components/layout/Layout';
import CategoriesPage from '~/components/screens/Categories/Categories';
import { CategoryContextProvider } from '~/contexts/category.context';

const Categories: NextPage = () => (
  <CategoryContextProvider>
    <Layout title="Categories" className="categories">
      <CategoriesPage />
    </Layout>
  </CategoryContextProvider>

);

export default Categories;
