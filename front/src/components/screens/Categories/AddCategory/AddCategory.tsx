import { FC } from 'react';

import SectionForm from '~/components/shared/SectionForm/SectionForm';
import Title from '~/components/shared/Title/Title';
import Form from './Form';

const AddCategory: FC = () => (
  <SectionForm className="add-category">
    <Title
      className="add-category"
      title="Add new category"
      text="This information will help you out lorem ipsum"
    />
    <Form />
  </SectionForm>
);

export default AddCategory;
