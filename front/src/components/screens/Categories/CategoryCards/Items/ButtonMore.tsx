import { FC, useRef } from 'react';

import Img from '~/components/base/Img/Img';

import more from '~/assets/img/icons/more.svg';

const ButtonMore: FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleButtonClick = () => {
    const buttonElement = buttonRef.current;

    if (buttonElement) {
      if (buttonElement.classList.contains('category-cards__more_active')) {
        buttonElement.classList.remove('category-cards__more_active');
      } else {
        const activeElements = document.querySelectorAll('.category-cards__more_active');

        activeElements.forEach((element) => {
          element.classList.remove('category-cards__more_active');
        });
        buttonElement.classList.add('category-cards__more_active');
      }
    }
  };

  const img = {
    src: more,
    alt: '...',
  };

  return (
    <button
      type="button"
      className="category-cards__more"
      onClick={ handleButtonClick }
      ref={ buttonRef }
    >
      <Img className="category-cards" img={ img } resetStyle />
      <ul className="category-cards__sub-list">
        <li>edit</li>
        <li>remove</li>
      </ul>
    </button>
  );
};

export default ButtonMore;
