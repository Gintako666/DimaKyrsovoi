import { FC } from 'react';
import LastDays from './LastDays/LastDays';
import Chart from './Chart/Chart';

const Home: FC = () => (
  <>
    <LastDays />
    <Chart />
  </>
);

export default Home;
