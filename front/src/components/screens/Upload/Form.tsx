import { FC, FormEvent, useState } from 'react';

import FileService from '~/services/file.service';
import UploadFile from './UploadFile/UploadFile';

const Form: FC = () => {
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
  const { uploadFile } = FileService;

  // Handle submit
  interface IHandleSubmit {
    (e: FormEvent<HTMLFormElement>): void;
  }

  const handleSubmit: IHandleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (selectedFile) {
      formData.append(
        'file',
        selectedFile,
        selectedFile.name,
      );

      uploadFile(formData);
      setSelectedFile(null);
    } else {
      alert('Upload a file!');
    }
  };

  return (
    <form action="#" className="upload__form" onSubmit={ handleSubmit }>
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
