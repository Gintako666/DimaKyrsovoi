import { FC, useRef, useEffect } from 'react';
import Img from '~/components/base/Img/Img';
import more from '~/assets/img/icons/more.svg';

const ButtonMore: FC = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Handle outside click
    interface IHandleOutsideClick {
      (e: MouseEvent): void
    }
    const handleClickOutside: IHandleOutsideClick = (e) => {
      const buttonElement = buttonRef.current;
      const target = e.target as HTMLElement;

      if (buttonElement && !buttonElement.contains(target)) {
        const activeElements = document.querySelectorAll('.category-cards__more_active');

        activeElements.forEach((element) => {
          element.classList.remove('category-cards__more_active');
        });
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle click button
  interface IHandleClickButton {
    (e: React.MouseEvent<HTMLButtonElement>): void
  }
  const handleClickButton: IHandleClickButton = (e) => {
    e.stopPropagation();

    const buttonElement = buttonRef.current;

    if (buttonElement) {
      const activeElements = document.querySelectorAll('.category-cards__more_active');

      activeElements.forEach((element) => {
        element.classList.remove('category-cards__more_active');
      });

      buttonElement.classList.add('category-cards__more_active');
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
      onClick={ handleClickButton }
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
