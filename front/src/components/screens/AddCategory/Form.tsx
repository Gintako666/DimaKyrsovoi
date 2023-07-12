import { FC, FormEvent } from 'react';

import AddForm from '~/components/shared/AddForm/AddForm';

import useAddForm from '~/hooks/useAddForm';

import CategoriesService from '~/services/categories.service';

const Form: FC = () => {
  const { name, color, handleChange } = useAddForm();

  // Handle submit
  interface IHandleSubmit {
    (e: FormEvent<HTMLFormElement>): void;
  }
  const handleSubmit: IHandleSubmit = (e) => {
    e.preventDefault();

    if (name) {
      const { addCategory } = CategoriesService;
      addCategory({ name, color });
      handleChange({ target: { id: 'name', value: '' } });
    } else {
      alert('Enter category name!');
    }
  };

  return (
    <form action="#" className="add-category__form" onSubmit={ handleSubmit }>
      <AddForm
        className="add-category"
        type="category"
        name={ name }
        color={ color }
        onChange={ handleChange }
      />
      <button className="add-category__button button" type="submit">
        Save
      </button>
    </form>
  );
};

export default Form;
