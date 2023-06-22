import { NextPage } from 'next';
import Layout from '~/components/layout/Layout';
import AddCategoryPage from '~/components/screens/AddCategory/AddCategory';

const AddCategory: NextPage = () => (
  <Layout title="AddCategory" className="add-category">
    <AddCategoryPage />
  </Layout>
);

export default AddCategory;
