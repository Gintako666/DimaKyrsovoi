import { FC, FormEvent } from 'react';

import AddForm from '~/components/shared/AddForm/AddForm';

import useAddForm from '~/hooks/useAddForm';

const Form: FC = () => {
  const { name, handleChange } = useAddForm();

  // Handle submit
  interface IHandleSubmit {
    (e: FormEvent<HTMLFormElement>): void;
  }
  const handleSubmit: IHandleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form action="#" className="add-category__form" onSubmit={ handleSubmit }>
      <AddForm
        className="add-category"
        type="category"
        name={ name }
        onChange={ handleChange }
      />
      <button className="add-category__button button" type="submit">
        Save
      </button>
    </form>
  );
};

export default Form;
