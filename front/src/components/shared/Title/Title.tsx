import { FC } from 'react';
import handleClassName from '~/utils/className.util';

interface TitleProps {
  className: string;
  modifier?: string;
  title: string;
  text: string;
}

const Title: FC<TitleProps> = ({
  className, modifier, title, text,
}) => {
  const modifiedClassName = handleClassName(!!modifier, 'title', modifier);

  return (
    <div className={ `${ className }__title ${ modifiedClassName } ` }>
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
};

Title.defaultProps = {
  modifier: undefined,
};

export default Title;
