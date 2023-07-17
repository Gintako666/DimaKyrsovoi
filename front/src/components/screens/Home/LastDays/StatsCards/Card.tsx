import { FC } from 'react';

import { amountFormater } from '~/utils/amountFormater';
import { ICard } from '../card.interface';

interface CardProps {
  card: ICard;
}

const Card: FC<CardProps> = ({
  card: {
    name, number,
  },
}) => (
  <div className="stats-cards__card">
    <h4 className="stats-cards__name">{name}</h4>
    <div className="stats-cards__box">
      <div className="stats-cards__main">
        <span className="stats-cards__number">
          {amountFormater.format(number)}
        </span>
      </div>
    </div>
  </div>
);

export default Card;
