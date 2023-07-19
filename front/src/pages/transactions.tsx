import { NextPage } from 'next';
import Layout from '~/components/layout/Layout';
import TransactionsPage from '~/components/screens/Transactions/Transactions';

const Transactions: NextPage = () => (
  <Layout title="Transactions" className="transactions">
    <TransactionsPage />
  </Layout>
);

export default Transactions;
