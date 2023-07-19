import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import FileService from '~/services/file.service';
import UploadFile from './UploadFile/UploadFile';

const Form: FC = () => {
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
  const { push } = useRouter();

  const { uploadFile } = FileService;

  // Handle submit
  interface IHandleSubmit {
    (e: FormEvent<HTMLFormElement>): void;
  }

  const handleSubmit: IHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedFile) {
      const { name } = selectedFile;

      try {
        formData.append(
          'file',
          selectedFile,
          name,
        );

        await uploadFile(formData);

        setSelectedFile(null);
        push('/transactions');
      } catch (error) {
      /* eslint-disable-next-line no-alert */
        alert(`Incorrect file format. We can't recognize data structure in file: ${ name }`);
      }
    }
  };

  return (
    <form action="#" className="upload__form" onSubmit={ handleSubmit }>
      <UploadFile
        selectedFile={ selectedFile }
        setSelectedFile={ setSelectedFile }
      />
      <button type="submit" disabled={ !selectedFile } className="upload__button button">
        Upload
      </button>
    </form>
  );
};

export default Form;
