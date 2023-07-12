import { FC } from 'react';

import Title from '~/components/shared/Title/Title';
import SectionForm from '~/components/shared/SectionForm/SectionForm';
import Form from './Form';

const Upload: FC = () => (
  <SectionForm className="upload">
    <Title
      className="upload"
      title="Add new Finance report file"
      text="This information will help you out lorem ipsum"
    />
    <Form />
  </SectionForm>
);

export default Upload;
