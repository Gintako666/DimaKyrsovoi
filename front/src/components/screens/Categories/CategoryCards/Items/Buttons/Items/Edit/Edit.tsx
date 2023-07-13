import { Dispatch, FC, SetStateAction } from 'react';

import Img from '~/components/base/Img/Img';
import Popup from '~/components/base/Popup/Popup';
import Title from '~/components/shared/Title/Title';

import { ICategory } from '~/interfaces/category.interface';

import pencil from '~/assets/img/icons/pencil.svg';
import Form from './Form';

interface EditProps {
  category: ICategory,
  setEditedCategory: Dispatch<SetStateAction<ICategory | null>>
}

const Edit: FC<EditProps> = ({
  category,
  setEditedCategory,
}) => {
  const img = {
    src: pencil,
    alt: 'Edit',
  };

  const button = <Img className="category-cards" img={ img } />;

  return (
    <Popup className="category-cards" modifier="edit" button={ button }>
      <Title
        className="category-cards"
        title="Edit category"
        text="This information will help you out lorem ipsum"
      />
      <Form
        category={ category }
        setEditedCategory={ setEditedCategory }
      />
    </Popup>
  );
};

export default Edit;
