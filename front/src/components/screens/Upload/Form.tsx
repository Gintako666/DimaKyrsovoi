import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import useDirectusApi from '~/hooks/useDirectusApi';
import Name from '~/components/shared/AddForm/Name';
import useAddForm from '~/hooks/useAddForm';
import UploadFile from './UploadFile/UploadFile';

const Form: FC = () => {
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
  const { uploadFile } = useDirectusApi();
  const { name, handleChange } = useAddForm();
  const router = useRouter();

  // Handle submit
  interface IHandleSubmit {
    (e: FormEvent<HTMLFormElement>): void;
  }

  const handleSubmit: IHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    try {
      if (selectedFile) {
        formData.append(
          'file',
          selectedFile,
          name,
        );

        await uploadFile(formData);
        setSelectedFile(null);
        router.push('/transactions');
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(`Incorrect file format. We can't recognize data structure in file: ${ selectedFile?.name }`);
    }
  };

  return (
    <form action="#" className="upload__form" onSubmit={ handleSubmit }>
      <Name name={ name } onChange={ handleChange } type="file" />
      <UploadFile
        selectedFile={ selectedFile }
        setSelectedFile={ setSelectedFile }
      />
      <button type="submit" disabled={ !(selectedFile && name) } className="upload__button button">
        Upload
      </button>
    </form>
  );
};

export default Form;
