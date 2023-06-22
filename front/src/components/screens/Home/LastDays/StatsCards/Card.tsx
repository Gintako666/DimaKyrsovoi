import { FC } from 'react';

import handleClassName from '~/utils/className.util';
import { ICard } from '../card.interface';

interface CardProps {
  card: ICard;
}

const Card: FC<CardProps> = ({
  card: {
    name, income, number, prevNumber,
  },
}) => {
  const difference = number - prevNumber;
  const percentageDifference = Math.abs((difference / prevNumber) * 100);
  const roundedPercentageDifference = percentageDifference.toFixed(2);

  const roundedNumber = Math.round(number);

  // Format number
  interface IFormatNumber {
    (number: number): string;
  }
  const formatNumber: IFormatNumber = (num) => {
    const options = { style: 'decimal' };
    const formattedNumber = num.toLocaleString('en-US', options);
    return formattedNumber;
  };

  const modifiedClassName = handleClassName(
    number < prevNumber,
    'stats-cards__difference',
    'negative',
  );

  return (
    <div className="stats-cards__card">
      <h4 className="stats-cards__name">{name}</h4>
      <div className="stats-cards__box">
        <div className="stats-cards__main">
          <span className="stats-cards__number">
            {formatNumber(roundedNumber)}
          </span>
          {income && (
            <span className="stats-cards__income">
              income
              {' '}
              {formatNumber(income)}
            </span>
          )}
        </div>
        <span className={ modifiedClassName }>
          {roundedPercentageDifference}
          %
        </span>
      </div>
    </div>
  );
};

export default Card;
