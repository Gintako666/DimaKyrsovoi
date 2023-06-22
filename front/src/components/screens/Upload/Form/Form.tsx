import { FC, FormEvent, useState } from 'react';

import AddForm from '~/components/shared/AddForm/AddForm';
import useAddForm from '~/hooks/useAddForm';
import UploadFile from './UploadFile/UploadFile';

const Form: FC = () => {
  const { name, description, handleChange } = useAddForm();
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);

  // Handle submit
  interface IHandleSubmit {
    (e: FormEvent<HTMLFormElement>): void;
  }
  const handleSubmit: IHandleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form action="#" className="upload__form" onSubmit={ handleSubmit }>
      <AddForm
        className="upload"
        type="file"
        name={ name }
        description={ description }
        onChange={ handleChange }
      />
      <UploadFile
        selectedFile={ selectedFile }
        setSelectedFile={ setSelectedFile }
      />
      <button className="upload__button button" type="submit">
        Save
      </button>
    </form>
  );
};

export default Form;
