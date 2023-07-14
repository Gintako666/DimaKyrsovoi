import { FC, FormEvent, useState } from 'react';

import FileService from '~/services/file.service';
import UploadFile from './UploadFile/UploadFile';
import { useRouter } from 'next/router';

const Form: FC = () => {
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
  const { uploadFile } = FileService;
  const router = useRouter()

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
      router.push("/transactions")
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
      <button type="submit" className="upload__button button">
        Save
      </button>
    </form>
  );
};

export default Form;
