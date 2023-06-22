import { FC } from 'react';

import StatsCards from './StatsCards/StatsCards';

import cards from './cards.const';

const LastDays: FC = () => (
  <section className="last-days">
    <div className="last-days__container">
      <h3 className="last-days__title">Last 30 Days</h3>
      <StatsCards cards={ cards } />
    </div>
  </section>
);

export default LastDays;
