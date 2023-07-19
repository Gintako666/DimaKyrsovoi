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

  const defaultSubHint = '.csv, .xlsx or .numbers file up to 1OMB';
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
  const handleChangeFile: IHandleChangeFile = ({ target: { files } }) => {
    const file = files && files[0];

    if (file) {
      const { name, size, type } = file;

      // Checking the type of file
      if (
        ![
          'text/csv',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ].includes(type)
        && !name.endsWith('.numbers')
      ) {
        /* eslint-disable no-alert */
        alert('File type must be CSV, XLSX or NUMBERS!');
        /* eslint-disable no-alert */

        setSelectedFile(null);
        return;
      }

      // Checking the size of the file
      if (size > 10 * 1024 * 1024) {
        /* eslint-disable no-alert */
        alert('File size should not exceed 10MB!');
        /* eslint-disable no-alert */

        setSelectedFile(null);
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleActivate = () => {
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
        onDragOver={ handleActivate }
        onDragLeave={ handleDeactivate }
        onDrop={ handleDeactivate }
      >
        <div className="upload-file__box">
          <Img className="upload-file" img={ img } priority resetStyle />
          <span className="upload-file__hint">
            <span>Upload a file</span>
            {' '}
            or drag and drop
          </span>
          <span className="upload-file__sub-hint">{subHint}</span>
          <input
            className="upload-file__input"
            type="file"
            accept=".csv, .xlsx, .numbers"
            onChange={ handleChangeFile }
          />
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
