import { NextPage } from 'next';
import Layout from '~/components/layout/Layout';
import CategoriesPage from '~/components/screens/Categories/Categories';

const Categories: NextPage = () => (
  <Layout title="Categories" className="categories">
    <CategoriesPage />
  </Layout>
);

export default Categories;
