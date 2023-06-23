import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

import Img from '~/components/base/Img/Img';

import arrow from '~/assets/img/icons/arrow.svg';
import handleClassName from '~/utils/className.util';

interface FileProps {
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
}

const UploadFile: FC<FileProps> = ({ selectedFile, setSelectedFile }) => {
  const [ isActive, setIsActive ] = useState(false);

  const defaultSubHint = '.csv file up to 1OMB';
  const [ subHint, setSubHint ] = useState(defaultSubHint);

  useEffect(() => {
    if (selectedFile) {
      setSubHint(selectedFile.name);
    } else {
      setSubHint(defaultSubHint);
    }
  }, [ selectedFile ]);

  // Handle change file
  interface IHandleChangeFile {
    ({ target }: ChangeEvent<HTMLInputElement>): void;
  }
  const handleChangeFile: IHandleChangeFile = ({ target }) => {
    const file = target.files && target.files[0];

    if (file) {
      // Checking the type of file
      if (file.type !== 'text/csv') {
        alert('File type must be CSV!');
        setSelectedFile(null);
        return;
      }

      // Checking the size file
      if (file.size > 10 * 1024 * 1024) {
        alert('File size should not exceed 10MB!');
        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleActive = () => {
    setIsActive(true);
  };

  const handleDeactivate = () => {
    setIsActive(false);
  };

  const modifiedClassName = handleClassName(isActive, 'upload-file__body');

  const img = {
    src: arrow,
    alt: '^',
  };

  return (
    <div className="upload__upload-file upload-file">
      <span className="upload-file__label">Upload file</span>
      <div
        className={ modifiedClassName }
        onDragOver={ handleActive }
        onDragLeave={ handleDeactivate }
        onDrop={ handleDeactivate }
      >
        <div className="upload-file__box">
          <Img className="upload-file" img={ img } resetStyle />
          <span className="upload-file__hint">
            <span>Upload a file</span>
            {' '}
            or drag and drop
          </span>
          <span className="upload-file__sub-hint">{subHint}</span>
          <input
            className="upload-file__input"
            type="file"
            accept=".csv"
            onChange={ handleChangeFile }
          />
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
