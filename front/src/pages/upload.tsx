import { NextPage } from 'next';
import Layout from '~/components/layout/Layout';
import UploadPage from '~/components/screens/Upload/Upload';

const Upload: NextPage = () => (
  <Layout title="Upload" className="upload">
    <UploadPage />
  </Layout>
);

export default Upload;
