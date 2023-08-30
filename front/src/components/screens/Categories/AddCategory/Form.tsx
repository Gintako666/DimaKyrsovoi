/* eslint-disable @typescript-eslint/naming-convention */
import { useRouter } from 'next/router';
import {
  FC, FormEvent, useContext, useMemo,
} from 'react';

import AddForm from '~/components/shared/AddForm/AddForm';
import { CategoriesContext } from '~/contexts/category.context';

import useAddForm from '~/hooks/useAddForm';

import CategoriesService from '~/services/categories.service';

const Form: FC = () => {
  const { setOpenPopup, setCategories } = useContext(CategoriesContext);
  const { name, color, handleChange } = useAddForm();
  const router = useRouter();
  const { addCategory } = CategoriesService;
  const { category } = router.query;
  const parent_category = useMemo(() => (
    Array.isArray(category) ? +category[0] : Number(category) || null), [ category ]);

  // Handle submit
  interface IHandleSubmit {
    (e: FormEvent<HTMLFormElement>): void;
  }
  const handleSubmit: IHandleSubmit = async (e) => {
    e.preventDefault();

    if (name) {
      const newCategory = await addCategory({
        name,
        color,
        parent_category,
      });

      handleChange({
        target: {
          id: 'name',
          value: '',
        },
      });

      setCategories((prev) => {
        if (prev) {
          return [ ...prev, newCategory ];
        }

        return prev;
      });
      setOpenPopup(false);
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
