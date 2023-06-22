import { FC } from 'react';

import StatsCard from './Card';

import { ICard } from '../card.interface';

interface StatsCardsProps {
  cards: ICard[];
}

const StatsCards: FC<StatsCardsProps> = ({ cards }) => {
  const cardItems = cards.map((card) => (
    <StatsCard key={ card.name } card={ card } />
  ));

  return <div className="last-days__stats-cards stats-cards">{cardItems}</div>;
};

export default StatsCards;
