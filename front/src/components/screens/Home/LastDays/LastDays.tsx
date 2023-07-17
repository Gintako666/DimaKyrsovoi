import { FC } from 'react';

import StatsCards from './StatsCards/StatsCards';
import { ICard } from './card.interface';

type Props = {
  cards: ICard[]
};

const LastDays: FC<Props> = ({ cards }) => (
  <section className="last-days">
    <div className="last-days__container">
      <h3 className="last-days__title">Last 30 Days</h3>
      <StatsCards cards={ cards } />
    </div>
  </section>
);

export default LastDays;
