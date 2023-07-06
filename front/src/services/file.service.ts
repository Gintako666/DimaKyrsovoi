import axiosInstance from './axiosInstance';

const path = '/upload';

interface IUploadFile {
  (file: FormData): void
}

const uploadFile: IUploadFile = async (file) => {
  try {
    await axiosInstance.post(path, file);
  } catch (err) {
    alert(err);
  }
};

export default uploadFile;
