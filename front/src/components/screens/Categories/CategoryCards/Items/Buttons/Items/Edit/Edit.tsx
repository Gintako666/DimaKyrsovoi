import {
  FC,
} from 'react';

import Img from '~/components/base/Img/Img';
import Popup from '~/components/base/Popup/Popup';
import Title from '~/components/shared/Title/Title';

import useScrollLock from '~/hooks/useScrollLock';

import { ICategory } from '~/interfaces/category.interface';

import pencil from '~/assets/img/icons/pencil.svg';
import Form from './Form';

interface EditProps {
  category: ICategory,
}

const Edit: FC<EditProps> = ({
  category,
}) => {
  const { isScrollLocked, setIsScrollLocked } = useScrollLock();

  const handleActivePopup = () => {
    setIsScrollLocked(!isScrollLocked);
  };

  const img = {
    src: pencil,
    alt: 'Edit',
  };

  const button = <Img className="category-cards" img={ img } />;

  return (
    <Popup
      className="category-cards"
      modifier="edit"
      button={ button }
      isActive={ isScrollLocked }
      setIsActive={ setIsScrollLocked }
    >
      <Title
        className="category-cards"
        title="Edit category"
        text="This information will help you out lorem ipsum"
      />
      <Form
        category={ category }
        onSubmit={ handleActivePopup }
      />
    </Popup>
  );
};

export default Edit;
