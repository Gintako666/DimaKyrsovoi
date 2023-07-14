import axiosInstance from './axiosInstance';

const PATH = '/upload';

const FileService = {
  async uploadFile(file: FormData) {
    try {
      await axiosInstance.post(PATH, file);
    } catch (err) {
      alert(err);
      throw err;
    }
  },
};

export default FileService;
