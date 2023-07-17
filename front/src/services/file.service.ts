import axiosInstance from './axiosInstance';

const PATH = '/upload';

const FileService = {
  async uploadFile(file: FormData) {
    try {
      await axiosInstance.post(PATH, file);
    } catch (err) {
      /* eslint-disable no-console */
      console.log(err);
      /* eslint-disable no-console */
    }
  },
};

export default FileService;
