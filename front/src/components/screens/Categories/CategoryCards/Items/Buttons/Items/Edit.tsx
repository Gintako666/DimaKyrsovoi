import { FC } from 'react';

import Img from '~/components/base/Img/Img';

import pencil from '~/assets/img/icons/pencil.svg';

interface EditProps {

}

const Edit: FC<EditProps> = ({

}) => {
  const img = {
    src: pencil,
    alt: 'Edit',
  };

  return (
    <button type="button">
      <Img className="category-cards" img={ img } />
    </button>
  );
};

export default Edit;
