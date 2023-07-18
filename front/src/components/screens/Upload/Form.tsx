import { FC, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

import FileService from '~/services/file.service';
import UploadFile from './UploadFile/UploadFile';

const Form: FC = () => {
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
  const { uploadFile } = FileService;
  const router = useRouter();

  // Handle submit
  interface IHandleSubmit {
    (e: FormEvent<HTMLFormElement>): void;
  }

  const handleSubmit: IHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedFile) {
      formData.append(
        'file',
        selectedFile,
        selectedFile.name,
      );

      await uploadFile(formData);
      setSelectedFile(null);
      router.push('/transactions');
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
