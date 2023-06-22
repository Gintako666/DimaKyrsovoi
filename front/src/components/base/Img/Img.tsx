import { FC, useRef } from 'react';
import Image from 'next/image';

import handleClassName from '~/utils/className.util';

import { IImg } from '~/interfaces/img.interface';
import Loader from '~/components/shared/Loader/Loader';
import useLoading from '~/hooks/useLoading';

interface ImgProps {
  className: string;
  modifier?: string;
  img: IImg;
  style?: { [property: string]: string };
  resetStyle?: boolean;
  priority?: boolean;
  quality?: number;
  width?: number;
  height?: number;
}

const Img: FC<ImgProps> = ({
  className,
  modifier,
  img: { src, alt },
  style,
  resetStyle,
  priority,
  quality,
  width,
  height,
}) => {
  const objectRef = useRef<HTMLImageElement>(null);
  const isLoading = useLoading(objectRef);

  const modifiedClassName = handleClassName(
    !!modifier,
    `${ className }__img`,
    modifier,
  );
  const defaultClassName = resetStyle ? '' : ' img';

  return (
    <div className={ modifiedClassName + defaultClassName } style={ style }>
      {isLoading && <Loader />}

      <Image
        src={ src }
        alt={ alt }
        priority={ priority }
        quality={ quality }
        width={ width }
        height={ height }
        ref={ objectRef }
      />
    </div>
  );
};

Img.defaultProps = {
  modifier: undefined,
  style: undefined,
  resetStyle: false,
  priority: false,
  quality: 75,
  width: 0,
  height: 0,
};

export default Img;
