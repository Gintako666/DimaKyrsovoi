import { Dispatch, FC, SetStateAction } from 'react';

import Popup from '~/components/base/Popup/Popup';
import Img from '~/components/base/Img/Img';

import { ICategory } from '~/interfaces/category.interface';

import bin from '~/assets/img/icons/bin.svg';
import CategoriesService from '~/services/categories.service';

interface DeleteProps {
  category: ICategory,
  setDeletedCategoryId: Dispatch<SetStateAction<ICategory['id'] | null>>
}

const Delete: FC<DeleteProps> = ({
  category: {
    id, name,
  },
  setDeletedCategoryId,
}) => {
  const img = {
    src: bin,
    alt: 'Remove',
  };

  const button = <Img className="category-cards" img={ img } />;

  const handleDeleteOnClick = async () => {
    await CategoriesService.deleteCategory(id);
    setDeletedCategoryId(id);
  };

  return (
    <Popup className="category-cards" button={ button }>
      <p className="category-cards__confirm-text">
        Are you sure you want to delete category
        {' '}
        {name}
        ? All transactions will become uncategorized.
      </p>
      <button type="button" className="category-cards__confirm-button" onClick={ handleDeleteOnClick }>
        Yes, delete
      </button>
    </Popup>
  );
};

export default Delete;
