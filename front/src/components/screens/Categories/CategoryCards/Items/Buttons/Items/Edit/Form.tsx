import {
  Dispatch, FC, FormEvent, SetStateAction,
} from 'react';

import AddForm from '~/components/shared/AddForm/AddForm';

import useAddForm from '~/hooks/useAddForm';

import CategoriesService from '~/services/categories.service';

import { ICategory } from '~/interfaces/category.interface';

interface FormProps {
  category: ICategory;
  setEditedCategory: Dispatch<SetStateAction<ICategory | null>>;
}

const Form: FC<FormProps> = ({ category, setEditedCategory }) => {
  const { name, color, handleChange } = useAddForm(
    category.name,
    category.color,
  );

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

      const { editCategory } = CategoriesService;
      await editCategory(editedCategory);

      setEditedCategory(editedCategory);
    }
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
