import {
  FC, FormEvent, useContext,
} from 'react';

import AddForm from '~/components/shared/AddForm/AddForm';

import useAddForm from '~/hooks/useAddForm';

import CategoriesService from '~/services/categories.service';

import { ICategory } from '~/interfaces/category.interface';
import { CategoriesContext } from '~/contexts/category.context';

interface FormProps {
  category: ICategory;
  onSubmit: () => void
}

const Form: FC<FormProps> = ({ category, onSubmit }) => {
  const { setOpenPopup, setCategories } = useContext(CategoriesContext);
  const { name, color, handleChange } = useAddForm(
    category.name,
    category.color,
  );
  const { editCategory } = CategoriesService;

  // Handle submit
  interface IHandleSubmit {
    (e: FormEvent<HTMLFormElement>): void;
  }
  const handleSubmit: IHandleSubmit = async (e) => {
    if (name !== category.name || color !== category.color) {
      e.preventDefault();

      const editedCategory = {
        ...category,
        name,
        color,
      };

      await editCategory(editedCategory);

      setCategories((prev) => prev?.map((categoryItem) => {
        if (categoryItem.id === editedCategory.id) {
          return editedCategory;
        }

        return categoryItem;
      }) || null);

      setOpenPopup(false);
    }

    onSubmit();
  };

  return (
    <form action="#" onSubmit={ handleSubmit }>
      <AddForm
        className="category-cards"
        type="category"
        name={ name }
        color={ color }
        onChange={ handleChange }
      />
    </form>
  );
};

export default Form;
