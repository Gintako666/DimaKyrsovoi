import { FC, useContext } from 'react';

import Popup from '~/components/base/Popup/Popup';
import Img from '~/components/base/Img/Img';

import CategoriesService from '~/services/categories.service';

import { ICategory } from '~/interfaces/category.interface';

import bin from '~/assets/img/icons/bin.svg';
import { CategoriesContext } from '~/contexts/category.context';

interface DeleteProps {
  category: ICategory,
}

const Delete: FC<DeleteProps> = ({
  category: {
    id, name,
  },
}) => {
  const { setOpenPopup, setCategories } = useContext(CategoriesContext);
  const img = {
    src: bin,
    alt: 'Remove',
  };

  const { deleteCategory } = CategoriesService;

  const button = <Img className="category-cards" img={ img } />;

  const handleDeleteOnClick = async () => {
    await deleteCategory(id);

    setCategories((prev) => prev?.filter((categoryItem) => categoryItem.id !== id) || null);
    setOpenPopup(false);
  };

  return (
    <Popup className="category-cards" modifier="delete" button={ button }>
      <p className="category-cards__confirm-text">
        Are you sure you want to delete category
        {' '}
        {name}
        ? All transactions will become uncategorized.
      </p>
      <button type="button" className="category-cards__confirm-button button" onClick={ handleDeleteOnClick }>
        Yes, delete
      </button>
    </Popup>
  );
};

export default Delete;
