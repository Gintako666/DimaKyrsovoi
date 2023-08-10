import { useRouter } from 'next/router';
import { FC, FormEvent } from 'react';

import AddForm from '~/components/shared/AddForm/AddForm';

import useAddForm from '~/hooks/useAddForm';

import CategoriesService from '~/services/categories.service';

const Form: FC = () => {
  const { name, color, handleChange } = useAddForm();
  const router = useRouter();
  const { addCategory } = CategoriesService;

  // Handle submit
  interface IHandleSubmit {
    (e: FormEvent<HTMLFormElement>): void;
  }
  const handleSubmit: IHandleSubmit = (e) => {
    e.preventDefault();

    if (name) {
      addCategory({
        name,
        color,
      });
      handleChange({
        target: {
          id: 'name',
          value: '',
        },
      });

      router.push('/categories');
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
    </form>
  );
};

export default Form;
