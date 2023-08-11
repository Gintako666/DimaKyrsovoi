import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import FileService from '~/services/file.service';
import useAddForm from '~/hooks/useAddForm';
import AddForm from '~/components/shared/AddForm/AddForm';
import UploadFile from './UploadFile/UploadFile';

const Form: FC = () => {
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
  const { push } = useRouter();

  const { uploadFile } = FileService;
  const { name: inputName, handleChange } = useAddForm();

  // Handle submit
  interface IHandleSubmit {
    (e: FormEvent<HTMLFormElement>): void;
  }

  const handleSubmit: IHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedFile) {
      try {
        formData.append(
          'file',
          selectedFile,
          inputName,
        );

        await uploadFile(formData);

        setSelectedFile(null);
        push('/transactions');
      } catch (err) {
        /* eslint-disable-next-line no-alert */
        alert(`Incorrect file format. We can't recognize data structure in file: ${ name }`);
        /* eslint-disable-next-line no-console */
        console.error(err);
      }
    }
  };

  return (
    <form action="#" className="upload__form" onSubmit={ handleSubmit }>
      <AddForm className="upload" type="file" button={ false } name={ inputName } onChange={ handleChange } />
      <UploadFile
        selectedFile={ selectedFile }
        setSelectedFile={ setSelectedFile }
      />
      <button type="submit" disabled={ !(selectedFile && inputName) } className="upload__button button">
        Upload
      </button>
    </form>
  );
};

export default Form;
