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
  const [ isLoading, setIsLoading ] = useState(false);
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
        setIsLoading(true);
        formData.append(
          'file',
          selectedFile,
          inputName,
        );

        formData.append(
          'fileName',
          inputName,
        );

        await uploadFile(formData);

        setSelectedFile(null);
        setIsLoading(false);
        push('/transactions');
      } catch (err) {
        /* eslint-disable-next-line no-alert */
        alert(`Incorrect file format. We can't recognize data structure in file: ${ inputName }`);
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
      <button
        type="submit"
        disabled={ !(selectedFile && inputName) || isLoading }
        className="upload__button button"
      >
        Upload
      </button>
    </form>
  );
};

export default Form;
